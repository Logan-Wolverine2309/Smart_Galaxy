import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

export default function CameraRig({ targetPosition }) {
  const { camera } = useThree();
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (targetPosition) {
      const desired = tmp.copy(targetPosition).add(new THREE.Vector3(0, 2.5, 6));
      camera.position.lerp(desired, 0.06);
      camera.lookAt(targetPosition);
    } else {
      camera.position.lerp(tmp.set(0, 12, 30), 0.04);
      camera.lookAt(0, 0, 0);
    }
  });
  return null;
}
