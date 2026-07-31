export const FACE_LANDMARKS = Object.freeze({
  leftEyeOuter: 33,
  rightEyeOuter: 263,
  noseBridge: 168,
  leftTemple: 234,
  rightTemple: 454,
});

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);

export function createCoverMapper(sourceSize, stageSize, mirrored = false) {
  const sourceWidth = Math.max(1, Number(sourceSize.width));
  const sourceHeight = Math.max(1, Number(sourceSize.height));
  const stageWidth = Math.max(1, Number(stageSize.width));
  const stageHeight = Math.max(1, Number(stageSize.height));
  const coverScale = Math.max(stageWidth / sourceWidth, stageHeight / sourceHeight);
  const renderedWidth = sourceWidth * coverScale;
  const renderedHeight = sourceHeight * coverScale;
  const offsetX = (stageWidth - renderedWidth) / 2;
  const offsetY = (stageHeight - renderedHeight) / 2;

  return (landmark) => {
    const normalizedX = mirrored ? 1 - landmark.x : landmark.x;
    return {
      x: offsetX + normalizedX * renderedWidth,
      y: offsetY + landmark.y * renderedHeight,
    };
  };
}

export function calculateGlassesPose(
  landmarks,
  sourceSize,
  stageSize,
  mirrored = false,
  options = {}
) {
  if (!Array.isArray(landmarks) || landmarks.length <= FACE_LANDMARKS.rightEyeOuter) {
    return null;
  }

  const mapPoint = createCoverMapper(sourceSize, stageSize, mirrored);
  const firstEye = mapPoint(landmarks[FACE_LANDMARKS.leftEyeOuter]);
  const secondEye = mapPoint(landmarks[FACE_LANDMARKS.rightEyeOuter]);
  const bridge = mapPoint(landmarks[FACE_LANDMARKS.noseBridge]);
  const firstTemple = mapPoint(landmarks[FACE_LANDMARKS.leftTemple]);
  const secondTemple = mapPoint(landmarks[FACE_LANDMARKS.rightTemple]);
  const leftEye = firstEye.x <= secondEye.x ? firstEye : secondEye;
  const rightEye = firstEye.x <= secondEye.x ? secondEye : firstEye;
  const eyeDistance = distance(leftEye, rightEye);

  if (!Number.isFinite(eyeDistance) || eyeDistance < 8) return null;

  const stageWidth = Math.max(1, Number(stageSize.width));
  const widthMultiplier = Number(options.widthMultiplier) || 2.18;
  const frameFillRatio = clamp(Number(options.frameFillRatio) || 0.82, 0.3, 1);
  const faceWidthScale = clamp(Number(options.faceWidthScale) || 0.98, 0.75, 1.2);
  const minWidthRatio = Number(options.minWidthRatio) || 0.22;
  const maxWidthRatio = Number(options.maxWidthRatio) || 0.92;
  const faceWidth = distance(firstTemple, secondTemple);
  const proportionalWidth =
    Number.isFinite(faceWidth) && faceWidth > eyeDistance
      ? (faceWidth * faceWidthScale) / frameFillRatio
      : eyeDistance * widthMultiplier;
  const eyeMidpoint = {
    x: (leftEye.x + rightEye.x) / 2,
    y: (leftEye.y + rightEye.y) / 2,
  };
  const leftSpan = distance(leftEye, bridge);
  const rightSpan = distance(bridge, rightEye);
  const yawBalance = (rightSpan - leftSpan) / Math.max(1, leftSpan + rightSpan);

  return {
    x: eyeMidpoint.x * 0.35 + bridge.x * 0.65,
    y: eyeMidpoint.y + eyeDistance * 0.035,
    width: clamp(
      proportionalWidth,
      stageWidth * minWidthRatio,
      stageWidth * maxWidthRatio
    ),
    rotation: Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x) * (180 / Math.PI),
    yaw: clamp(yawBalance * 46, -19, 19),
  };
}

function smoothAngle(previous, next, alpha) {
  const delta = ((next - previous + 540) % 360) - 180;
  return previous + delta * alpha;
}

export function smoothGlassesPose(previous, next, alpha = 0.34) {
  if (!next) return previous || null;
  if (!previous) return { ...next };
  const amount = clamp(alpha, 0, 1);

  return {
    x: previous.x + (next.x - previous.x) * amount,
    y: previous.y + (next.y - previous.y) * amount,
    width: previous.width + (next.width - previous.width) * amount,
    rotation: smoothAngle(previous.rotation, next.rotation, amount),
    yaw: previous.yaw + (next.yaw - previous.yaw) * amount,
  };
}
