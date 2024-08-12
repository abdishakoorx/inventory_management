"use client";
import React, { useState, useEffect } from "react";
import Header from "../(components)/Header";
import { useAppSelector, useAppDispatch } from "../redux";
import { setIsDarkMode } from "@/state";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const Settings = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const [userSettings, setUserSettings] = useState<UserSetting[]>([
    { label: "Username", value: "john_doe", type: "text" },
    { label: "Email", value: "john.doe@example.com", type: "text" },
    { label: "Notification", value: true, type: "toggle" },
    { label: "Dark Mode", value: isDarkMode, type: "toggle" },
    { label: "Language", value: "English", type: "text" },
  ]);

  useEffect(() => {
    // Update the Dark Mode setting when the global state changes
    setUserSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.label === "Dark Mode" ? { ...setting, value: isDarkMode } : setting
      )
    );
  }, [isDarkMode]);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);

    // If the toggled setting is Dark Mode, update the global state
    if (settingsCopy[index].label === "Dark Mode") {
      dispatch(setIsDarkMode(settingsCopy[index].value as boolean));
    }
  };

  return (
    <div className={`min-h-screen`}>
      <Header name="Settings" />
      <main className="container mx-auto px-4 py-8">
        <div className={`shadow rounded-lg bg-white `}>
          {userSettings.map((setting, index) => (
            <div key={index} className={`flex items-center justify-between p-4 border-b last:border-b-0}`}>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{setting.label}</h2>
                <p>
                  {setting.type === "toggle" ? "Enable/Disable" : "Edit"}
                </p>
              </div>
              <div className="flex-1 text-right">
                {setting.type === "toggle" ? (
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={setting.value as boolean}
                      onChange={() => handleToggleChange(index)}
                    />
                    <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer ${isDarkMode ? 'dark:bg-gray-700' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
                  </label>
                ) : (
                  <input
                    type="text"
                    value={setting.value as string}
                    onChange={(e) => {
                      const settingsCopy = [...userSettings];
                      settingsCopy[index].value = e.target.value;
                      setUserSettings(settingsCopy);
                    }}
                    className={`w-[300px] py-2 px-4 pl-10 pr-4 rounded-xl border-2 transition duration-300
                      ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500 shadow-lg' : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'}`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Settings;