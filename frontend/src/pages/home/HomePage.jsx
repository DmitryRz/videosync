import React from 'react';
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
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

            <section className="py-5">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col">
                            <h2 className="fw-bold">Почему Videosync?</h2>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 bg-dark border-secondary">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mx-auto">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="9" cy="7" r="4"></circle>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                        </svg>
                                    </div>
                                    <h5>Групповой просмотр</h5>
                                    <p className="text-muted">Собирайтесь с друзьями и смотрите видео вместе, независимо от
                                        расстояния</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 bg-dark border-secondary">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mx-auto">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth="2">
                                            <path
                                                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                    </div>
                                    <h5>Живой чат</h5>
                                    <p className="text-muted">Обсуждайте происходящее на экране в реальном времени через
                                        встроенный чат</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 bg-dark border-secondary">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mx-auto">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                        </svg>
                                    </div>
                                    <h5>Простота использования</h5>
                                    <p className="text-muted">Создавайте комнаты за пару кликов и делитесь ссылкой с
                                        друзьями</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;