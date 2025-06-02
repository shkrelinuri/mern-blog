// ProfilePage.js

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";


export default function ProfilePage() {
    const { userInfo } = useContext(UserContext);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await fetch('http://localhost:4000/profile', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setProfileData(data);
            } else {
                console.error('Failed to fetch profile data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    return (
        <div className="profile-page-container">
            <div className="profile-info">
                {profileData && (
                    <>
                        <div className="profile-picture">
                            <div className="profile-circle">
                                <span>{userInfo.username.charAt(0).toUpperCase()}</span>
                            </div>
                            <p>{userInfo.username}</p>
                        </div>
                        <p>{userInfo.date}</p>
                    </>
                )}
            </div>
        </div>
    );
}
