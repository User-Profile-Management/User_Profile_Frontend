import React, { useEffect, useState, useRef } from 'react';
import DashboardLayout from '../../layout/DashboardLayout';
import StatCard from '../../components/StatCard';
import CircularProgress from '../../components/CircularProgress';
import Verified from "../../assets/verified.svg";
import FallbackBadge from "../../assets/NoBadge.svg";
import BronzeBadge from "../../assets/BronzeBadge.svg";
import GoldBadge from "../../assets/GoldBadge.svg";
import SilverBadge from "../../assets/SilverBadge.svg";
import Tick from "../../assets/tick.svg";

import projectService from '../../service/userprojectService';
import userService from '../../service/userService';
import certificateService from '../../service/certificateService';
import { Link } from 'react-router-dom';

function StudentDashboard() {
    const [progress, setProgress] = useState(0);
    const [certifications, setCertifications] = useState([]);
    const [projects, setProjects] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const completedCountRef = useRef(0);
    const previousProjectCount = useRef(0);
    const previousBadgeCount = useRef(0);
    const completedCount = projects.filter(project => project.status === 'COMPLETED').length;
    const maxCertificateScore = 5;

    const performanceScore = (
        (completedCount / (projects.length || 1)) * 60 +
        (certifications.length / maxCertificateScore) * 40
    );

    const badgeLevels = [
        { label: 'BRONZE', src: BronzeBadge, min: 1 },
        { label: 'GOLD', src: GoldBadge, min: 3 },
        { label: 'SILVER', src: SilverBadge, min: 2 },   
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 10000); // refresh every 10 seconds
    
        return () => clearInterval(interval);
    }, []);

    const fetchProgress = async () => {
        try {
          const userProgress = await userService.getStudentProgress(); // API call
          setProgress(userProgress.progress); // Assuming it's a number like 75
        } catch (error) {
          console.error("Error fetching progress:", error);
        }
      };
    
      useEffect(() => {
        fetchProgress();
      }, []);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const userCerts = await certificateService.getCertificatesList();
                setCertifications(userCerts);
            } catch (error) {
                console.error("Error fetching certifications:", error);
            }
        };

        const fetchProjects = async () => {
            try {
                const userProjects = await projectService.getProjectsList();
                setProjects(userProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
    
        const fetchData = async () => {
            try {
                const userProgress = await userService.getStudentProgress();
                const userCerts = await certificateService.getCertificatesList();
                const userProjects = await projectService.getProjectsList();
    
                setProgress(userProgress);
                setCertifications(userCerts);
                setProjects(userProjects);
    
                const completed = userProjects.filter(p => p.status === 'COMPLETED').length;
    
                // 🔔 Trigger notification if completed count increased
                if (completed > completedCountRef.current) {
                    const diff = completed - completedCountRef.current;
                    const message = diff === 1 
                        ? "🎉 Congrats! You completed a project!"
                        : `🎉 You completed ${diff} new projects!`;
    
                    setNotifications(prev => [{ message }, ...prev]);
                }
    
                completedCountRef.current = completed; // update stored count

                if (projects.length > previousProjectCount.current) {
                    const diff = projects.length - previousProjectCount.current;
                    const message = diff === 1
                        ? "📌 A new project has been assigned to you!"
                        : `📌 ${diff} new projects have been assigned!`;
                
                    setNotifications(prev => [{ message }, ...prev]);
                }
                previousProjectCount.current = projects.length;

                if (badges.length > previousBadgeCount.current) {
                    const diff = badges.length - previousBadgeCount.current;
                    const message = diff === 1
                        ? "🏅 You earned a new badge!"
                        : `🏅 You earned ${diff} new badges!`;
                
                    setNotifications(prev => [{ message }, ...prev]);
                }
                previousBadgeCount.current = badges.length;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchData();
        fetchCertificates();
        fetchProjects();

    }, []);

    return (
        <DashboardLayout>
            <div className='grid grid-rows-9 h-full'>
                <div>
                    <div className="text-2xl font-semibold">Home</div>
                    <div className='text-zinc-500'>Student Dashboard</div>
                </div>
                <div className=" row-span-5 md:row-span-8 ">
                    <div className='grid grid-rows-5 gap-y-6 h-full'>
                        <div className="row-span-2">
                            <div className="grid grid-cols-2 h-full gap-6 md:grid-cols-4">
                                <StatCard number={performanceScore} title="Overall Performance" color="bg-sky-900" />
                                <StatCard 
                                    number={projects.filter(project => project.status !== 'COMPLETED').length} 
                                    title="Ongoing Projects" 
                                    color="bg-sky-700" 
                                />
                                {/* Notifications */}
                                <div className="col-span-2 row-span-2 border border-zinc-200 bg-white rounded-xl p-4 h-full hidden md:flex">
                                    <div className="grid grid-rows-7">
                                        <div className="font-semibold text-xl">Notifications</div>
                                        <div className="row-span-6 overflow-y-scroll scrollbar-hide mt-4 max-h-48">
                                            {notifications.length > 0 ? (
                                                notifications.map((note, index) => (
                                                    <div key={index} className="flex flex-col border-b border-zinc-200 py-2 gap-4 justify-between">
                                                        <div className="text-md">{note.message}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-sm text-zinc-400">No new notifications.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row-span-3">
                            <div className="grid grid-cols-4 h-full gap-6">
                                {/* Left section */}
                                <div className="col-span-4 md:col-span-3">
                                    <div className="grid grid-rows-5 h-full gap-y-6">
                                        {/* Progress */}
                                        <div className="lg:row-span-2 border border-zinc-200 bg-white rounded-xl p-4 h-full flex items-center">
                                            <div className="flex justify-between w-full">
                                                <div className='flex gap-6 items-center'>
                                                    <CircularProgress percentage={progress || 0} />
                                                    <div className='flex flex-col'>
                                                        <div className='text-2xl font-semibold'>You're so close!</div>
                                                        <div className='text-lg '>Finish up for the best experience.</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <Link to='/student-profile' className="px-4 py-2 bg-sky-700 font-semibold text-white rounded-lg hover:bg-sky-900 transition">
                                                        Update Profile
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Certifications & Badges */}
                                        <div className=" row-span-4 lg:[row-span-3 h-full]">
                                            <div className="grid grid-cols-2 gap-6 h-full md:h-full xl:max-h-60">
                                                {/* Certifications */}
                                                <div className="border border-zinc-200 bg-white rounded-xl p-4 md:h-full xl:max-h-60">
                                                <div className="flex flex-col h-full">
                                                    {/* Title */}
                                                    <div className="font-semibold text-xl mb-2">Your Certifications</div>

                                                    {/* Scrollable Certification List */}
                                                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                                                    {certifications.length > 0 ? (
                                                        certifications.map((cert) => (
                                                        <div
                                                            key={cert.certificateId}
                                                            className="flex border-b border-zinc-200 py-2 justify-between hover:cursor-pointer min-h-16"
                                                        >
                                                            <div className="flex flex-col justify-between">
                                                            <div className="text-md font-medium">{cert.certificateName}</div>
                                                            <div className="text-sm">Issued By: {cert.issuedBy}</div>
                                                            </div>
                                                            <div>
                                                            <img src={Verified} alt="verified icon" />
                                                            </div>
                                                        </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-sm text-zinc-400">No certifications yet.</div>
                                                    )}
                                                    </div>
                                                </div>
                                                </div>

                                                {/* Badges */}
                                                <div className=" grid grid-rows-7 border border-zinc-200 bg-white rounded-xl p-4">
                                                    <div className="font-semibold text-xl">Your Badges</div>
                                                    <div className="flex-col flex row-span-6 items-center justify-center gap-4  md:flex-row">
                                                        {badgeLevels.map((badge, i) => {
                                                            const isUnlocked = completedCount >= badge.min;
                                                            return (
                                                                <div key={i} className="flex flex-col gap-y-4 items-center">
                                                                    <img 
                                                                        src={isUnlocked ? badge.src : FallbackBadge} 
                                                                        alt={`${badge.label}Badge`} 
                                                                        className={`${(badge.label === 'BRONZE' || badge.label === 'SILVER') ? 'w-24 h-24' : ''}`}
                                                                    />
                                                                    <div className={`text-sm font-bold text-center ${isUnlocked ? 'text-black' : 'text-gray-300'}`}>
                                                                        {badge.label} BADGE
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Projects Summary */}
                                <div className='col-span-4 lg:[flex flex-col border border-zinc-200 bg-white rounded-xl p-4 gap-5 justify-between ] md:col-span-1 '>
                                    <div className='grid grid-rows-5 gap-6 h-full'>
                                        <div className='text-6xl font-bold text-center flex items-end justify-center'>
                                            {completedCount}
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className="text-center text-2xl font-semibold">Projects Completed</div>
                                            <div className="text-center">Finish up for the best experience.</div>
                                        </div>
                                        <div className='row-span-3 overflow-y-scroll scrollbar-hide'>
                                            {projects.length > 0 ? (
                                                projects.map((project, index) => (
                                                    <div key={index} className="flex border-b border-zinc-200 py-2 justify-between">
                                                        <div className="flex flex-col justify-between">
                                                            <div className="text-md font-medium">{project.project?.projectName}</div>
                                                            <div className="text-sm">Mentor: {project.project?.mentor?.fullName || 'N/A'}</div>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            {project.status === "COMPLETED" ? (
                                                                <img src={Tick} alt="Completed Project" />
                                                            ) : (
                                                                <>
                                                                    <span className="text-sm text-gray-600">{project.progress || 0}%</span>
                                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress || 0}%` }}></div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-sm text-zinc-400">No projects found.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default StudentDashboard;
