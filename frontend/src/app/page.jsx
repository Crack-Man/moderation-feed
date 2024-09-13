"use client";

import "@/app/components/FeedComponent";
import "@/app/styles/scss/Page.scss";
import FeedComponent from "@/app/components/FeedComponent";
import HotkeysComponent from "@/app/components/HotkeysComponent";

export default function Home() {
    return (
        <div className="container container_flexible">
            <FeedComponent />
            <HotkeysComponent />
        </div>
    );
}
