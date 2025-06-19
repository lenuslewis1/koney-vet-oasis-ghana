import React from "react";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = "koneysvethospital@gmail.com";

const Settings = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
        <div className="mb-8">
          <div className="text-lg font-medium text-gray-700 mb-2">
            Admin Email
          </div>
          <div className="text-xl text-gray-900 font-mono">{ADMIN_EMAIL}</div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
