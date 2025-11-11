import React from 'react';
import {Link} from "react-router-dom";
import {FEATURES} from "../../constants/homePage.jsx";

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h1 className="display-4 fw-bold mb-4">
                            Смотрите видео вместе в <span className="text-primary">реальном времени</span>
                        </h1>
                        <p className="lead mb-4">
                            Создавайте виртуальные комнаты для синхронного просмотра видео с друзьями и коллегами.
                            Общайтесь в чате, делитесь эмоциями и наслаждайтесь контентом вместе.
                        </p>
                        <div className="d-flex gap-3">
                            <Link to="/videos" className="btn btn-primary btn-lg px-4">Создать комнату</Link>
                            <Link to="/about" className="btn btn-outline-light btn-lg px-4">Узнать больше</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const FeatureCard = ({ svg, title, description }) => {
    return (
        <div className="col-md-4">
            <div className="card h-100 bg-dark border-secondary">
                <div className="card-body text-center p-4">
                    <div className="feature-icon mx-auto">
                        {svg}
                    </div>
                    <h5>{title}</h5>
                    <p className="text-muted">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

const HomePage = () => {
    return (
        <div>
            <HeroSection />

            <section className="py-5">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col">
                            <h2 className="fw-bold">Почему Videosync?</h2>
                        </div>
                    </div>
                    <div className="row g-4">
                        {FEATURES.map(feature => (
                            <FeatureCard
                                key={feature.id}
                                title={feature.title}
                                description={feature.description}
                                svg={feature.svg}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;