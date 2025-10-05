"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Loader2, Trash2 } from "lucide-react";

export default function LogoPage() {
  const [logo, setLogo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchLogo = async () => {
    try {
      const res = await fetch("/api/logo");
      const data = await res.json();
      if (data.success) setLogo(data.data);
    } catch {
      toast.error("Failed to fetch logo");
    }
  };

  useEffect(() => {
    fetchLogo();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/logo", { method: "POST", body: data });
      const result = await res.json();
      if (result.success) {
        setLogo(result.data);
        toast.success("Logo updated successfully!");
      } else toast.error("Upload failed");
    } catch {
      toast.error("Network error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Company Logo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-4">
              {logo?.imageUrl ? (
                <img src={logo.imageUrl} alt="Logo" className="w-32 h-32 object-contain" />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center border">No Logo</div>
              )}

              <input type="file" onChange={handleFileChange} />
              {uploading && <Loader2 className="animate-spin w-6 h-6" />}

              {logo?.imageUrl && (
                <Button
                  variant="destructive"
                  className="mt-2"
                  onClick={async () => {
                    if (!confirm("Are you sure you want to delete the logo?")) return;
                    try {
                      const res = await fetch("/api/logo", { method: "DELETE" });
                      const data = await res.json();
                      if (data.success) {
                        setLogo(null);
                        toast.success("Logo deleted successfully");
                      } else toast.error(data.message || "Delete failed");
                    } catch {
                      toast.error("Network error");
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Logo
                </Button>
              )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
