import { FaceLandmarker, FilesetResolver } from "../vendor/mediapipe/vision_bundle.mjs";
import { calculateGlassesPose, smoothGlassesPose } from "./face-fit.js";

const params = new URLSearchParams(window.location.search);
const stage = document.querySelector("[data-stage]");
const video = document.querySelector("[data-camera]");
const photo = document.querySelector("[data-photo]");
const frame = document.querySelector("[data-frame]");
const photoInput = document.querySelector("[data-photo-input]");
const startButton = document.querySelector("[data-camera-start]");
const stopButton = document.querySelector("[data-camera-stop]");
const status = document.querySelector("[data-status]");
const returnLink = document.querySelector("[data-return-link]");
const productName = document.querySelector("[data-product-name]");
const brandName = document.querySelector("[data-brand-name]");
const brandBadge = document.querySelector("[data-brand-badge]");
const trackingStatus = document.querySelector("[data-tracking-status]");
const trackingLabel = document.querySelector("[data-tracking-label]");
const trackingButton = document.querySelector("[data-tracking-toggle]");
const controls = Object.fromEntries(
  Array.from(document.querySelectorAll("[data-control]")).map((control) => [
    control.dataset.control,
    control,
  ])
);

const state = {
  stream: null,
  mirror: true,
  drag: null,
  objectUrl: "",
  faceLandmarker: null,
  faceLandmarkerPromise: null,
  runningMode: null,
  trackingEnabled: true,
  trackingFrame: 0,
  lastVideoTime: -1,
  lastDetectionAt: 0,
  smoothedPose: null,
  lastLandmarks: null,
  missedFaces: 0,
  activeSource: null,
};

const safeReturn = (value) => {
  if (!value) return "index.html";
  try {
    const url = new URL(value, window.location.href);
    if (["http:", "https:"].includes(url.protocol)) return url.href;
  } catch (_) {
    // Fall through to the portal home page.
  }
  return "index.html";
};

const brand = params.get("brand") || "Innova Boutique";
const name = params.get("name") || "Montura seleccionada";
const image = params.get("image") || "";
const normalizedBrand = brand.toLocaleLowerCase("es");
const isSilhouette = normalizedBrand.includes("silhouette");
const requestedAnchor = Number(params.get("anchor"));
const requestedWidthMultiplier = Number(params.get("fit"));
const requestedFrameFill = Number(params.get("fill"));
const requestedFaceScale = Number(params.get("faceScale"));
const isBalmain = normalizedBrand.includes("balmain");
stage.classList.toggle("is-silhouette-frame", isSilhouette);
stage.classList.toggle("is-balmain-frame", isBalmain);
stage.classList.toggle("is-alfred-frame", !isSilhouette && !isBalmain);
const frameProfile = {
  anchor: Number.isFinite(requestedAnchor) && requestedAnchor > 0 ? requestedAnchor : 50,
  widthMultiplier:
    Number.isFinite(requestedWidthMultiplier) && requestedWidthMultiplier > 0
      ? requestedWidthMultiplier
      : isSilhouette
        ? 3.15
        : 2.18,
  frameFillRatio:
    Number.isFinite(requestedFrameFill) && requestedFrameFill > 0
      ? requestedFrameFill
      : isSilhouette
        ? 0.56
        : isBalmain
          ? 0.83
          : 0.82,
  faceWidthScale:
    Number.isFinite(requestedFaceScale) && requestedFaceScale > 0
      ? requestedFaceScale
      : isSilhouette
        ? 0.96
        : isBalmain
          ? 1.02
          : 0.98,
  maxWidthRatio: isSilhouette ? 1.48 : 0.92,
};
document.title = `${name} · Probador virtual Innova Boutique`;
brandName.textContent = brand.toUpperCase();
brandBadge.textContent = brand.toUpperCase();
productName.textContent = name;
returnLink.href = safeReturn(params.get("return"));
stage.style.setProperty("--frame-anchor-x", `${-frameProfile.anchor}%`);

if (image) {
  frame.src = image;
  frame.alt = `${name}, vista de prueba virtual`;
  frame.addEventListener(
    "load",
    () => {
      stage.classList.add("has-frame");
    },
    { once: true }
  );
  frame.addEventListener(
    "error",
    () => {
      stage.classList.remove("has-frame");
      setStatus(
        "No se pudo cargar la montura seleccionada. Vuelve al producto e inténtalo de nuevo.",
        true
      );
    },
    { once: true }
  );
}

function setStatus(message, isError = false) {
  status.textContent = message;
  status.style.color = isError ? "#9b2727" : "";
}

function setTrackingState(kind, label) {
  trackingStatus.hidden = false;
  trackingStatus.dataset.state = kind;
  trackingLabel.textContent = label;
}

function updateTrackingButton() {
  trackingButton.classList.toggle("is-active", state.trackingEnabled);
  trackingButton.setAttribute("aria-pressed", String(state.trackingEnabled));
  trackingButton.lastChild.textContent = state.trackingEnabled
    ? " Seguimiento automático"
    : " Seguimiento pausado";
}

function applyPose(pose) {
  if (!pose) return;
  stage.style.setProperty("--face-x", `${pose.x.toFixed(2)}px`);
  stage.style.setProperty("--face-y", `${pose.y.toFixed(2)}px`);
  stage.style.setProperty("--face-width", `${pose.width.toFixed(2)}px`);
  stage.style.setProperty("--face-rotation", `${pose.rotation.toFixed(2)}deg`);
  stage.style.setProperty("--face-yaw", `${pose.yaw.toFixed(2)}deg`);
}

function sourceGeometry(source) {
  if (source === video) {
    return { width: video.videoWidth, height: video.videoHeight };
  }
  return { width: photo.naturalWidth, height: photo.naturalHeight };
}

function processLandmarks(landmarks, source, mirrored) {
  const rect = stage.getBoundingClientRect();
  const pose = calculateGlassesPose(
    landmarks,
    sourceGeometry(source),
    { width: rect.width, height: rect.height },
    mirrored,
    frameProfile
  );
  if (!pose) return;

  state.lastLandmarks = landmarks;
  state.smoothedPose = smoothGlassesPose(state.smoothedPose, pose);
  state.missedFaces = 0;
  stage.classList.add("face-detected");
  applyPose(state.smoothedPose);
  setTrackingState("locked", "Montura siguiendo el rostro");
}

function processDetection(result, source, mirrored) {
  const landmarks = result?.faceLandmarks?.[0];
  if (landmarks) {
    processLandmarks(landmarks, source, mirrored);
    return;
  }

  state.missedFaces += 1;
  if (state.missedFaces > 5) {
    stage.classList.remove("face-detected");
    setTrackingState("searching", "Buscando un rostro");
  }
}

async function createFaceLandmarker(runningMode) {
  const wasmRoot = new URL("assets/vendor/mediapipe/wasm", window.location.href).href;
  const modelPath = new URL("assets/models/face_landmarker.task", window.location.href).href;
  const vision = await FilesetResolver.forVisionTasks(wasmRoot);
  const options = {
    baseOptions: {
      modelAssetPath: modelPath,
      delegate: "GPU",
    },
    runningMode,
    numFaces: 1,
    minFaceDetectionConfidence: 0.55,
    minFacePresenceConfidence: 0.55,
    minTrackingConfidence: 0.55,
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: false,
  };

  try {
    return await FaceLandmarker.createFromOptions(vision, options);
  } catch (gpuError) {
    return FaceLandmarker.createFromOptions(vision, {
      ...options,
      baseOptions: { modelAssetPath: modelPath, delegate: "CPU" },
    });
  }
}

async function ensureFaceLandmarker(runningMode) {
  if (!state.faceLandmarker) {
    setTrackingState("loading", "Cargando ajuste inteligente");
    state.faceLandmarkerPromise ||= createFaceLandmarker(runningMode);
    try {
      state.faceLandmarker = await state.faceLandmarkerPromise;
      state.runningMode = runningMode;
    } catch (error) {
      state.faceLandmarkerPromise = null;
      setTrackingState("error", "Ajuste manual disponible");
      throw error;
    }
  }

  if (state.runningMode !== runningMode) {
    await state.faceLandmarker.setOptions({ runningMode });
    state.runningMode = runningMode;
  }

  return state.faceLandmarker;
}

function stopTrackingLoop() {
  if (state.trackingFrame) cancelAnimationFrame(state.trackingFrame);
  state.trackingFrame = 0;
  state.lastVideoTime = -1;
  state.lastDetectionAt = 0;
}

function scheduleTrackingLoop() {
  stopTrackingLoop();
  state.trackingFrame = requestAnimationFrame(trackVideoFrame);
}

function trackVideoFrame(timestamp) {
  if (!state.stream || state.activeSource !== "camera") {
    stopTrackingLoop();
    return;
  }

  if (
    state.trackingEnabled &&
    state.faceLandmarker &&
    state.runningMode === "VIDEO" &&
    video.readyState >= 2 &&
    video.currentTime !== state.lastVideoTime &&
    timestamp - state.lastDetectionAt >= 44
  ) {
    try {
      const result = state.faceLandmarker.detectForVideo(video, timestamp);
      state.lastVideoTime = video.currentTime;
      state.lastDetectionAt = timestamp;
      processDetection(result, video, state.mirror);
    } catch (error) {
      setTrackingState("error", "Seguimiento temporalmente no disponible");
    }
  }

  state.trackingFrame = requestAnimationFrame(trackVideoFrame);
}

function stopCamera() {
  stopTrackingLoop();
  if (state.stream) {
    state.stream.getTracks().forEach((track) => track.stop());
    state.stream = null;
  }
  video.srcObject = null;
  stage.classList.remove("is-camera", "face-detected");
  stopButton.hidden = true;
  if (state.activeSource === "camera") state.activeSource = null;
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    setStatus("Este navegador no permite usar la cámara aquí. Puedes subir una fotografía.", true);
    return;
  }

  stopCamera();
  state.smoothedPose = null;
  state.lastLandmarks = null;
  state.missedFaces = 0;
  setStatus("Solicitando permiso para usar la cámara…");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 960 },
      },
      audio: false,
    });
    state.stream = stream;
    state.activeSource = "camera";
    video.srcObject = stream;
    await video.play();
    stage.classList.remove("is-photo");
    stage.classList.add("has-source", "is-camera");
    stage.classList.toggle("is-mirrored", state.mirror);
    stopButton.hidden = false;

    if (!state.trackingEnabled) {
      setTrackingState("idle", "Seguimiento pausado");
      setStatus("Cámara activa. Puedes ajustar la montura manualmente.");
      return;
    }

    setStatus("Cámara activa. Preparando el ajuste inteligente…");
    await ensureFaceLandmarker("VIDEO");
    setTrackingState("searching", "Buscando un rostro");
    scheduleTrackingLoop();
    setStatus(
      "Seguimiento activo: mueve la cabeza y la montura acompañará tu rostro automáticamente."
    );
  } catch (error) {
    stopCamera();
    const denied =
      error &&
      (error.name === "NotAllowedError" || error.name === "PermissionDeniedError");
    setStatus(
      denied
        ? "No se concedió acceso a la cámara. Puedes permitirlo en el navegador o subir una fotografía."
        : "No fue posible iniciar la cámara o el seguimiento facial. Puedes usar una fotografía y el ajuste manual.",
      true
    );
    setTrackingState("error", "Ajuste manual disponible");
  }
}

async function analyzePhoto() {
  if (!state.trackingEnabled || !photo.complete || !photo.naturalWidth) return;
  setStatus("Fotografía cargada. Detectando el rostro en este dispositivo…");

  try {
    const landmarker = await ensureFaceLandmarker("IMAGE");
    state.smoothedPose = null;
    state.missedFaces = 0;
    processDetection(landmarker.detect(photo), photo, false);
    if (state.missedFaces > 0) {
      setStatus(
        "No se detectó un rostro con claridad. Usa una fotografía frontal o ajusta la montura manualmente.",
        true
      );
    } else {
      setStatus("Rostro detectado. La montura se ha ajustado automáticamente.");
    }
  } catch (error) {
    setStatus("No se pudo activar el ajuste inteligente. El ajuste manual sigue disponible.", true);
  }
}

function showPhoto(file) {
  if (!file) return;
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
    setStatus("Selecciona una imagen JPG, PNG o WebP.", true);
    return;
  }
  if (file.size > 15 * 1024 * 1024) {
    setStatus("La fotografía no puede superar 15 MB.", true);
    return;
  }

  stopCamera();
  state.activeSource = "photo";
  state.smoothedPose = null;
  state.lastLandmarks = null;
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
  state.objectUrl = URL.createObjectURL(file);
  photo.onload = analyzePhoto;
  photo.src = state.objectUrl;
  stage.classList.remove("is-camera", "is-mirrored");
  stage.classList.add("has-source", "is-photo");
  setTrackingState("loading", "Preparando ajuste inteligente");
}

function updateControl(name, value) {
  const number = Number(value);
  if (name === "scale") {
    stage.style.setProperty("--frame-scale", number / 100);
    document.querySelector("[data-scale-output]").value = `${number}%`;
  }
  if (name === "x") {
    stage.style.setProperty("--frame-x", `${number}%`);
    document.querySelector("[data-x-output]").value = number;
  }
  if (name === "y") {
    stage.style.setProperty("--frame-y", `${number}%`);
    document.querySelector("[data-y-output]").value = number;
  }
  if (name === "rotation") {
    stage.style.setProperty("--frame-rotation", `${number}deg`);
    document.querySelector("[data-rotation-output]").value = `${number}°`;
  }
  if (name === "opacity") {
    stage.style.setProperty("--frame-opacity", number / 100);
    document.querySelector("[data-opacity-output]").value = `${number}%`;
  }
}

function resetFrame() {
  const defaults = { scale: 100, x: 0, y: 0, rotation: 0, opacity: 100 };
  Object.entries(defaults).forEach(([controlName, value]) => {
    controls[controlName].value = value;
    updateControl(controlName, value);
  });
}

function reapplyLastLandmarks() {
  if (!state.lastLandmarks || !state.activeSource) return;
  const source = state.activeSource === "camera" ? video : photo;
  const mirrored = state.activeSource === "camera" && state.mirror;
  const rect = stage.getBoundingClientRect();
  const pose = calculateGlassesPose(
    state.lastLandmarks,
    sourceGeometry(source),
    { width: rect.width, height: rect.height },
    mirrored,
    frameProfile
  );
  state.smoothedPose = pose;
  applyPose(pose);
}

Object.entries(controls).forEach(([controlName, control]) => {
  control.addEventListener("input", () => updateControl(controlName, control.value));
});

startButton.addEventListener("click", startCamera);
stopButton.addEventListener("click", () => {
  stopCamera();
  if (!stage.classList.contains("is-photo")) stage.classList.remove("has-source");
  trackingStatus.hidden = true;
  setStatus("Cámara detenida.");
});
photoInput.addEventListener("change", () => showPhoto(photoInput.files?.[0]));
document.querySelector("[data-reset]").addEventListener("click", resetFrame);
document.querySelector("[data-mirror]").addEventListener("click", () => {
  state.mirror = !state.mirror;
  stage.classList.toggle("is-mirrored", state.mirror);
  reapplyLastLandmarks();
});

trackingButton.addEventListener("click", async () => {
  state.trackingEnabled = !state.trackingEnabled;
  updateTrackingButton();

  if (!state.trackingEnabled) {
    stage.classList.remove("face-detected");
    setTrackingState("idle", "Seguimiento pausado");
    setStatus("Seguimiento pausado. Los controles manuales siguen disponibles.");
    return;
  }

  if (state.activeSource === "camera" && state.stream) {
    try {
      await ensureFaceLandmarker("VIDEO");
      setTrackingState("searching", "Buscando un rostro");
      scheduleTrackingLoop();
      setStatus("Seguimiento automático activo.");
    } catch (error) {
      setStatus("No se pudo reactivar el seguimiento. Usa el ajuste manual.", true);
    }
  } else if (state.activeSource === "photo") {
    await analyzePhoto();
  } else {
    setTrackingState("idle", "Ajuste inteligente preparado");
  }
});

frame.addEventListener("pointerdown", (event) => {
  if (!stage.classList.contains("has-source")) return;
  frame.setPointerCapture(event.pointerId);
  state.drag = {
    pointerId: event.pointerId,
    clientX: event.clientX,
    clientY: event.clientY,
    x: Number(controls.x.value),
    y: Number(controls.y.value),
  };
});

frame.addEventListener("pointermove", (event) => {
  if (!state.drag || state.drag.pointerId !== event.pointerId) return;
  const rect = stage.getBoundingClientRect();
  const x = Math.max(
    -45,
    Math.min(45, state.drag.x + ((event.clientX - state.drag.clientX) / rect.width) * 100)
  );
  const y = Math.max(
    -45,
    Math.min(45, state.drag.y + ((event.clientY - state.drag.clientY) / rect.height) * 100)
  );
  controls.x.value = String(Math.round(x));
  controls.y.value = String(Math.round(y));
  updateControl("x", controls.x.value);
  updateControl("y", controls.y.value);
});

const finishDrag = (event) => {
  if (state.drag?.pointerId === event.pointerId) state.drag = null;
};
frame.addEventListener("pointerup", finishDrag);
frame.addEventListener("pointercancel", finishDrag);

window.addEventListener("resize", reapplyLastLandmarks);
window.addEventListener("pagehide", () => {
  stopCamera();
  state.faceLandmarker?.close();
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
});

updateTrackingButton();
resetFrame();
