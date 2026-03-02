export const getMoodFromBlendshapes = (blendshapes) => {
  if (!blendshapes || blendshapes.length === 0) return "No Face Detected";

  const scores = {};
  blendshapes[0].categories.forEach((shape) => {
    scores[shape.categoryName] = shape.score;
  });

  // Debugging ke liye (Browser Console mein check karein values)
  // console.log("Smile:", scores['mouthSmileLeft'], "Jaw:", scores['jawOpen']);

  // 1. SHOCKED Ankhein thodi bhi khuli ho aur mooh halka khula ho
  if (scores['eyeWideLeft'] > 0.15 || scores['eyeWideRight'] > 0.15 || scores['jawOpen'] > 0.2) {
    return "Shocked 😱";
  }

  // 2. HAPPY
  if (scores['mouthSmileLeft'] > 0.3 || scores['mouthSmileRight'] > 0.3) {
    return "Happy 😃";
  }

  // 3. ANGRY (Brows ko niche laayein aur ankhein sikodein)
  if (scores['browDownLeft'] > 0.2 || scores['browDownRight'] > 0.2) {
    return "Angry 😡";
  }

  // 4. SAD (Inner brows ko upar karein)
 if (scores['browInnerUp'] > 0.22 || scores['mouthFrownLeft'] > 0.15 || scores['mouthFrownRight'] > 0.15) {
    return "Sad 😢";
  }

  // 5. ANNOYED
  if (scores['mouthPressLeft'] > 0.45 || scores['eyeSquintLeft'] > 0.4) {
    return "Annoyed 😒";
  }

  return "Neutral 😐";
};