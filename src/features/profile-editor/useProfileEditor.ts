"use client";

import { useCallback, useRef, useState } from "react";
import type { ProfileEditorDTO, ProfilePatchDTO } from "@/types/profileEditor";

export type SaveState = "idle" | "saving" | "success" | "error";

type SaveMap = Record<string, SaveState>;

type PendingMap = Record<string, ProfilePatchDTO>;

async function patchProfile(payload: ProfilePatchDTO) {
  const res = await fetch("/api/me/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update profile");
  }

  return (await res.json()) as ProfileEditorDTO;
}

async function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/me/profile/avatar", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload avatar");
  }

  return (await res.json()) as { avatarUrl: string };
}

export function useProfileEditor(initialData: ProfileEditorDTO) {
  const [profile, setProfile] = useState<ProfileEditorDTO>(initialData);
  const [saveState, setSaveState] = useState<SaveMap>({});
  const pendingRef = useRef<PendingMap>({});
  const lastSavedRef = useRef<ProfileEditorDTO>(initialData);
  const lastAvatarFileRef = useRef<File | null>(null);

  const setSectionState = (key: string, state: SaveState) => {
    setSaveState((prev) => ({ ...prev, [key]: state }));
  };

  const updateSection = useCallback(
    async (key: string, patch: ProfilePatchDTO, optimistic: ProfileEditorDTO) => {
      pendingRef.current[key] = patch;
      setProfile(optimistic);
      setSectionState(key, "saving");
      try {
        const updated = await patchProfile(patch);
        setProfile(updated);
        lastSavedRef.current = updated;
        pendingRef.current[key] = undefined as unknown as ProfilePatchDTO;
        setSectionState(key, "success");
      } catch {
        setProfile(lastSavedRef.current);
        setSectionState(key, "error");
      }
    },
    [],
  );

  const retry = useCallback(
    async (key: string) => {
      const patch = pendingRef.current[key];
      if (!patch) {
        return;
      }
      await updateSection(key, patch, profile);
    },
    [profile, updateSection],
  );

  const updateAvatar = useCallback(
    async (file: File) => {
      lastAvatarFileRef.current = file;
      setSectionState("avatar", "saving");
      try {
        const { avatarUrl } = await uploadAvatar(file);
        const updated = { ...profile, avatarUrl };
        setProfile(updated);
        lastSavedRef.current = updated;
        setSectionState("avatar", "success");
      } catch {
        setSectionState("avatar", "error");
      }
    },
    [profile],
  );

  const retryAvatar = useCallback(async () => {
    const file = lastAvatarFileRef.current;
    if (!file) {
      return;
    }
    await updateAvatar(file);
  }, [updateAvatar]);

  return {
    profile,
    saveState,
    updateSection,
    retry,
    updateAvatar,
    retryAvatar,
  };
}

