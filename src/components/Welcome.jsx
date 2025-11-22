import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const FONT_WEIGHTS = {
    subtitle: {min: 100, max: 400, default: 100},
    title: {min: 400, max: 900, default: 400},
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{fontVariationSettings: `'wght' ${baseWeight}`}}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const {min, max} = FONT_WEIGHTS[type];

    const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        letters.forEach((letter) => {
            const letterRect = letter.getBoundingClientRect();
            const centerX = letterRect.left - rect.left + letterRect.width / 2;

            const distance = Math.abs(mouseX - centerX);
            const intensity = Math.exp(-(distance * distance) / 5000);


            const newWeight = min + intensity * (max - min);

            gsap.to(letter, {
                fontVariationSettings: `'wght' ${newWeight}`,
                duration: 0.2,
                ease: "power2.out",
            });
        });
    };

    const resetWeights = () => {
        letters.forEach((letter) => {
            gsap.to(letter, {
                fontVariationSettings: `'wght' ${min}`,
                duration: 0.3,
                ease: "power2.out",
            });
        });
    };

    // 👉 Add event listeners
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", resetWeights);

    // 👉 CLEANUP FUNCTION
    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", resetWeights);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        // get cleanup functions from setup
        const cleanupTitle = setupTextHover(titleRef.current, "title");
        const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");

        // return cleanup to GSAP/React
        return () => {
            cleanupTitle && cleanupTitle();
            cleanupSubtitle && cleanupSubtitle();
        };
    }, []);

    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText("Hey, I'm Laila! Welcome to my", "text-3xl font-georama", 100)}
            </p>

            <h1 ref={titleRef} className="mt-7">
                {renderText("Portfolio", "text-9xl italic font-georama")}
            </h1>

            <div className="small-screen">
                <p>This Portfolio is designed for desktop/tablet screens</p>
            </div>
        </section>
    );
};

export default Welcome;
