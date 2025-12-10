"use client";

import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Button } from "@astalla/ui";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setIsLoading(true);
        const file = e.target.files[0];
        const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
        const storageRef = ref(storage, `uploads/${filename}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(p);
            },
            (error) => {
                console.error("Upload error:", error);
                setIsLoading(false);
                alert("Upload failed. Please try again.");
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                onChange(downloadUrl);
                setIsLoading(false);
            }
        );
    };

    const onRemove = () => {
        onChange("");
    };

    return (
        <div className="space-y-4 w-full">
            {value ? (
                <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                    <img
                        src={value}
                        alt="Upload"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                        <Button
                            type="button"
                            onClick={onRemove}
                            className="h-8 w-8 p-0 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
                            disabled={disabled}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full max-w-sm border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition flex-col gap-2">
                    <ImageIcon className="h-8 w-8 text-zinc-400" />
                    <div className="text-sm text-zinc-500 text-center">
                        {isLoading ? (
                            <span>Uploading... {Math.round(progress)}%</span>
                        ) : (
                            <span>Click to upload image</span>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer max-w-sm"
                        onChange={onFileChange}
                        disabled={disabled || isLoading}
                    />
                </div>
            )}
        </div>
    );
}
