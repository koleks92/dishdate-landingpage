import React, { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";
import screenshotOne from "./assets/screenshot-one.png";
import screenshotTwo from "./assets/screenshot-two.png";
import "./App.css";
import { FaGithub, FaLinkedin, FaApple } from "react-icons/fa";

function App() {
    const [isBouncing, setIsBouncing] = useState(false);

    const [firstImageOpacity, setFirstImageOpacity] = useState(0);
    const [firstImageRotation, setFirstImageRotation] = useState("-30deg");
    const [secondImageOpacity, setSecondImageOpacity] = useState(0);
    const [secondImageRotation, setSecondImageRotation] = useState("30deg");

    const firstContainerRef = useRef(null);
    const secondContainerRef = useRef(null);
    const thirdContainerRef = useRef(null);

    const handleClick = () => {
        if (isBouncing) return;
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 1400);
    };

    useEffect(() => {
        // Detect deep link fallback
        const path = window.location.pathname;

        if (path === "/join-game") {
            // Optional delay so app has a chance to open
            setTimeout(() => {
                // Redirect to the homepage
                window.location.replace("/");
            }, 2000); // 2-second wait before redirect
        }

        // Handle scroll events for image animations
        const handleScroll = () => {
            const firstContainer = firstContainerRef.current;
            const secondContainer = secondContainerRef.current;
            const thirdContainer = thirdContainerRef.current;

            if (!firstContainer || !secondContainer || !thirdContainer) return;

            const windowHeight = window.innerHeight;

            const getOffsetFromTop = (rect) => rect.top / windowHeight;

            const firstRect = firstContainer.getBoundingClientRect();
            const secondRect = secondContainer.getBoundingClientRect();
            const thirdRect = thirdContainer.getBoundingClientRect();

            const firstOffset = getOffsetFromTop(firstRect);
            const secondOffset = getOffsetFromTop(secondRect);
            const thirdOffset = getOffsetFromTop(thirdRect);

            // First image
            if (secondOffset < 0.2) {
                setFirstImageOpacity(0);
                setFirstImageRotation("30deg");
            } else if (firstOffset > 0.8) {
                setFirstImageOpacity(0);
                setFirstImageRotation("-30deg");
            } else {
                setFirstImageOpacity(1);
                setFirstImageRotation("0deg");
            }

            // Second image
            if (thirdOffset < 0.2) {
                setSecondImageOpacity(0);
                setSecondImageRotation("-30deg");
            } else if (secondOffset < 0.8) {
                setSecondImageOpacity(1);
                setSecondImageRotation("0deg");
            } else {
                setSecondImageOpacity(0);
                setSecondImageRotation("30deg");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className="first-container">
                <div className="logo-container">
                    <img
                        src={logo}
                        alt="logo"
                        onClick={handleClick}
                        className={`logo ${isBouncing ? "bounce" : ""}`}
                        draggable={false}
                    />
                    <div>
                        <p className="slogan-text">Dine with a Match.</p>
                        <p className="slogan-text">Not a Maybe.</p>
                    </div>
                </div>

                <div className="logo-container-text">
                                        <p className="description-download">
                        Try now!
                    </p>
                    <a
                        href="https://apps.apple.com/us/app/dishdate/id6448311234"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-icons"
                    >
                        <FaApple />
                    </a>
                    <p className="description-text">
                        Soon to be available on the Google Play.
                    </p>
                    <p className="tester-text">
                        <a href="#tester-container">
                            Become a <b>tester</b> and help us with the final
                            touches!
                        </a>
                    </p>
                </div>
            </div>
            <div className="screenshot-container-one" ref={firstContainerRef}>
                <img
                    src={screenshotOne}
                    className="screenshot_one"
                    alt="First screenshot"
                    style={{
                        left: "50%",
                        opacity: firstImageOpacity,
                        transform: `translate(-50%, -50%) rotate(${firstImageRotation})`,
                        transition: "all 0.6s ease",
                        position: "absolute",
                        top: "50%",
                    }}
                />
            </div>
            <div className="screenshot-container-two" ref={secondContainerRef}>
                <img
                    src={screenshotTwo}
                    className="screenshot_two"
                    alt="Second screenshot"
                    style={{
                        left: "50%",
                        opacity: secondImageOpacity,
                        transform: `translate(-50%, -50%) rotate(${secondImageRotation})`,
                        transition: "all 0.6s ease",
                        position: "absolute",
                        top: "50%",
                    }}
                />
            </div>
            <div
                className="tester-container"
                id="tester-container"
                ref={thirdContainerRef}
            >
                <div className="tester-content">
                    <h2>Become a Tester</h2>

                    <h3>Android:</h3>
                    <p className="tester-text-steps">
                        1. Join our Google Group:{" "}
                        <a
                            href="https://groups.google.com/g/dishdate-testers-groups"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tester-link"
                        >
                            DishDate Testers Group
                        </a>
                    </p>
                    <p className="tester-text-steps">
                        2. Become a tester and download the app:{" "}
                        <a
                            href="https://play.google.com/apps/testing/com.koleks92.DishDate"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tester-link"
                        >
                            DishDate on Google Play
                        </a>
                    </p>
                    <p className="tester-text-steps">
                        3. Keep the app on your device for at least 2 weeks to
                        ensure you can provide meaningful feedback.
                    </p>
                    <p className="tester-text-steps">
                        4. Write feedback on Google Play Store
                    </p>

                    <h3>iOS:</h3>
                    <p className="tester-text-steps">
                        1. Download and install TestFlight from the app store:{" "}
                        <a
                            href="https://apps.apple.com/us/app/testflight/id899247664"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tester-link"
                        >
                            TestFlight on App Store
                        </a>
                    </p>
                    <p className="tester-text-steps">
                        2. Download the app through TestFlight:{" "}
                        <a
                            href="https://testflight.apple.com/join/WMn9VyhX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="tester-link"
                        >
                            DishDate on TestFlight
                        </a>
                    </p>
                    <p className="tester-text-steps">
                        3. Provide feedback directly through TestFlight.
                    </p>
                </div>
            </div>

            <div className="footer">
                <p className="footer-text">Made with ❤️ by koleks92</p>
                <div className="social-icons-container">
                    <a
                        href="https://www.linkedin.com/in/jan-konieczek/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icons"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://github.com/koleks92"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icons"
                    >
                        <FaGithub />
                    </a>
                </div>
            </div>
        </>
    );
}

export default App;
