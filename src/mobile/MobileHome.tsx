import { useState, useEffect } from "react";
import { ScrollingText, ScrollingTextProps } from "./ScrollingText";

import './mobile.css';

export function MobileHome() {

    return (<>
    <div className="mobile-home">

        {/*  Bio-related stuff  */}
        <div className="mobile-home-header">
            <p>
                <span className="typed-text">AdamBuchen.com</span>
            </p>
        </div>
        <div className="mobile-home-bio">
            <p className="mobile-home-section-header">
                <span className="typed-text">About</span>
            </p>
            <ScrollingText
                    key={1}
                    fullText="Senior Software Engineer"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href=""
                    target=""
                />
            <ScrollingText
                    key={2}
                    fullText="15 years of experience"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href=""
                    target=""
                />
            <br />
            <ScrollingText
                    key={3}
                    fullText="Engineering Manager"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href=""
                    target=""
                />
            <ScrollingText
                    key={4}
                    fullText="10 years of experience"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href=""
                    target=""
                />
            <br />
            <ScrollingText
                    key={5}
                    fullText="TPM, Infra Engineer, Architect"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href=""
                    target=""
                />
            <ScrollingText
                    key={6}
                    fullText="2+ years of experience"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href=""
                    target=""
                />
        </div>
        {/*  Links  */}
        <div className="mobile-home-links">
            <p className="mobile-home-section-header">
                <span className="typed-text">Links</span>
            </p>
            <ScrollingText
                    key={7}
                    fullText="LinkedIn (linkedin.com/in/AdamBuchen)"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href="https://www.linkedin.com/in/AdamBuchen"
                    target="_blank"
                />
            <ScrollingText
                    key={8}
                    fullText="Open in new tab &raquo;"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href="https://www.linkedin.com/in/AdamBuchen"
                    target="_blank"
                />
            <br />
            <ScrollingText
                    key={9}
                    fullText="GitHub (github.com/AdamBuchen)"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href="https://www.github.com/AdamBuchen"
                    target="_blank"
                />
            <ScrollingText
                    key={10}
                    fullText="Open in new tab &raquo;"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href="https://www.github.com/AdamBuchen"
                    target="_blank"
                />
            <br />
            <ScrollingText
                    key={11}
                    fullText="Altersnap (altersnap.app)"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href="https://altersnap.app"
                    target="_blank"
                />
            <ScrollingText
                    key={12}
                    fullText="Generative AI app built as co-founder"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href="https://altersnap.app"
                    target="_blank"
                />
            <ScrollingText
                    key={13}
                    fullText="Open in new tab &raquo;"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href="https://altersnap.app"
                    target="_blank"
                />
            <br />
            <ScrollingText
                    key={14}
                    fullText="Resume (PDF Format)"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href="/Adam_Buchen_Resume.pdf"
                    target="_blank"
                />
            <ScrollingText
                    key={15}
                    fullText="Open in new tab &raquo;"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href="/Adam_Buchen_Resume.pdf"
                    target="_blank"
                />
        </div>
        {/* Contact */}
        <div className="mobile-home-contacts">
            <p className="mobile-home-section-header">
                <span className="typed-text">Contact</span>
            </p>
            <ScrollingText
                    key={16}
                    fullText="adam[dot]buchen[at]gmail"
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href=""
                    target=""
                />
        </div>
        <div className="mobile-home-about-this-site">
            <p className="mobile-home-section-header">
                <span className="typed-text">About this site</span>
            </p>
            <ScrollingText
                    key={16}
                    fullText="This site was built with TypeScript and React. View at 1024px or wider for the full interactive experience."
                    typingSpeedMs={75}
                    isStyledLink={false}
                    href=""
                    target=""
                />
        </div>
        {/*  Footer  */}
    </div>
    
    </>)

};

type MobileHomeRow = {
    content: string,
    isStyledLink: boolean,
    href: string,
    target: string,
};

const rows: ScrollingTextProps[] = (
    [
        {
            fullText: 'Software Engineer / Engineering Manager / TPM',
            isStyledLink: false,
            href: '',
            target: '',
            typingSpeedMs: 100,
        },
        {
            fullText: 'Welcome to the mobile version of my site.',
            isStyledLink: false,
            href: '',
            target: '',
            typingSpeedMs: 100,
        },
        {
            fullText: 'LinkedIn',
            isStyledLink: false,
            href: '',
            target: '',
            typingSpeedMs: 100,
        },
        {
            fullText: 'GitHub',
            isStyledLink: false,
            href: '',
            target: '',
            typingSpeedMs: 100,
        },
        {
            fullText: 'Altersnap',
            isStyledLink: false,
            href: '',
            target: '',
            typingSpeedMs: 100,
        },
        {
            fullText: 'This site was built with TypeScript and React.',
            isStyledLink: false,
            href: '',
            target: '',
            typingSpeedMs: 100,
        },
    ]
);

/**
 * AdamBuchen.com
 * 
 * Adam Buchen
 * 
 * Software Engineer / Engineering Manager / TPM
 *
 * Welcome to the mobile version of my site.
 * 
 * LinkedIn
 * 
 * Github
 * 
 * Altersnap
 * 
 * Built with TypeScript and React 
*/