import { useState, useEffect, useRef } from "react";
import {
    Monitor, Palette, Smartphone, Rocket,
    GraduationCap, Sparkles,
    Atom, Briefcase, Handshake, Mail, Linkedin, Github, MapPin, Heart, Menu, X
} from "lucide-react";

const ACCENT = "#0ea5e9";
const ACCENT2 = "#f97316";

function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

function TypewriterEffect({ text }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer;
        if (!isDeleting && displayedText === text) {
            timer = setTimeout(() => setIsDeleting(true), 2500);
        } else if (isDeleting && displayedText === "") {
            timer = setTimeout(() => setIsDeleting(false), 500);
        } else {
            const speed = isDeleting ? 25 : 50;
            timer = setTimeout(() => {
                setDisplayedText(prev =>
                    isDeleting ? prev.slice(0, -1) : text.slice(0, prev.length + 1)
                );
            }, speed);
        }
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, text]);

    return (
        <span>
            {displayedText}
            <span style={{ borderRight: `2px solid ${ACCENT}`, paddingRight: 2, animation: "blinkCursor 0.8s step-end infinite" }}></span>
        </span>
    );
}

const navLinks = ["Home", "About", "Services", "Portofolio", "Kontak"];

const skills = [
    { name: "HTML & CSS", pct: 95 },
    { name: "Laravel", pct: 90 },
    { name: "JavaScript", pct: 88 },
    { name: "React.js", pct: 85 },
    { name: "Figma / UI Design", pct: 75 },
];

const services = [
    { icon: <Monitor size={24} color={ACCENT} />, title: "Web Development", desc: "Membangun website modern, responsif, dan cepat menggunakan teknologi terkini seperti React, Next.js, dan Tailwind CSS." },
    { icon: <Palette size={24} color={ACCENT} />, title: "UI/UX Design", desc: "Merancang antarmuka yang intuitif dan estetis menggunakan Figma dengan pendekatan user-centered design." },
    { icon: <Smartphone size={24} color={ACCENT} />, title: "Responsive Design", desc: "Memastikan tampilan dan fungsionalitas sempurna di semua perangkat — desktop, tablet, maupun mobile." },
    { icon: <Rocket size={24} color={ACCENT} />, title: "Performance Optimization", desc: "Mengoptimalkan kecepatan loading dan performa website hingga skor Lighthouse 90+ untuk semua metrik." },
];

const portfolio = [
    {
        cat: "Machine Learning",
        title: "Deteksi Penyakit Kulit dengan Tensorflow",
        desc: "Aplikasi cerdas untuk deteksi penyakit kulit berbasis gambar, didukung model CNN & Random Forest. Memberikan hasil prediksi analisis secara instan.",
        tech: ["React.js", "Python", "TensorFlow", "Machine Learning"],
        imageSrc: "/skin-ai.png",
        color: "#2e1065",
        source: "https://github.com/Heveann/ML-Penyakit-Kulit",
    },
];

function SectionLabel({ label, center }) {
    return (
        <div style={{ textAlign: center ? "center" : "left" }}>
            <span style={{
                fontSize: 13, fontWeight: 700, color: ACCENT2,
                letterSpacing: "0.1em", textTransform: "uppercase",
                borderBottom: `2px solid ${ACCENT2}`,
                paddingBottom: 4,
            }}>{label}</span>
        </div>
    );
}

export default function Portfolio() {
    const [activeNav, setActiveNav] = useState("Home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [heroVisible, setHeroVisible] = useState(false);
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [skillsRef, skillsInView] = useInView();
    const [servicesRef, servicesInView] = useInView();
    const [portfolioRef, portfolioInView] = useInView();
    const [contactRef, contactInView] = useInView();

    useEffect(() => {
        setTimeout(() => setHeroVisible(true), 80);
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
        setActiveNav(id);
    };

    const filtered = activeFilter === "Semua" ? portfolio : portfolio.filter(p => p.cat === activeFilter);

    return (
        <div style={{ fontFamily: "'Segoe UI', Georgia, sans-serif", background: "#f8fafc", color: "#1e293b", overflowX: "hidden" }}>

            {/* NAV */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                background: scrolled || mobileMenuOpen ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                boxShadow: scrolled || mobileMenuOpen ? "0 2px 20px rgba(0,0,0,0.08)" : "0 1px 0 rgba(0,0,0,0.06)",
                transition: "all 0.3s",
            }}>
                <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-[60px] md:h-[70px] flex items-center justify-between">
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: `linear-gradient(135deg, ${ACCENT2}, #fbbf24)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "white", fontWeight: 800, fontSize: 16,
                        }}>A</div>
                        <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }}>Rizki<span style={{ color: ACCENT }}>Dev</span></span>
                    </div>
                    <div className="hidden md:flex gap-8 items-center">
                        {navLinks.map(l => (
                            <button key={l} onClick={() => scrollTo(l)} style={{
                                background: "none", border: "none", cursor: "pointer",
                                fontSize: 13, fontWeight: 600, letterSpacing: "0.04em",
                                color: activeNav === l ? ACCENT : "#64748b",
                                borderBottom: activeNav === l ? `2px solid ${ACCENT}` : "2px solid transparent",
                                paddingBottom: 2, transition: "color 0.2s",
                            }}>{l.toUpperCase()}</button>
                        ))}
                        <button style={{
                            padding: "10px 22px", borderRadius: 8, border: "none", cursor: "pointer",
                            background: ACCENT, color: "white", fontWeight: 700, fontSize: 13,
                            boxShadow: `0 4px 14px ${ACCENT}44`, transition: "transform 0.2s",
                        }}
                            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; }}
                            onMouseLeave={e => { e.target.style.transform = ""; }}
                        >DOWNLOAD CV</button>
                    </div>
                    <button className="md:hidden p-2 text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-[60px] left-0 right-0 bg-white border-b border-gray-100 shadow-xl px-6 py-5 flex flex-col gap-5">
                        {navLinks.map(l => (
                            <button key={l} onClick={() => { scrollTo(l); setMobileMenuOpen(false); }} style={{
                                background: "none", border: "none", cursor: "pointer",
                                fontSize: 15, fontWeight: 600, letterSpacing: "0.04em",
                                color: activeNav === l ? ACCENT : "#64748b",
                                textAlign: "left"
                            }}>{l.toUpperCase()}</button>
                        ))}
                        <button onClick={() => setMobileMenuOpen(false)} style={{
                            padding: "12px 22px", borderRadius: 8, border: "none", cursor: "pointer",
                            background: ACCENT, color: "white", fontWeight: 700, fontSize: 14,
                            marginTop: 10, textAlign: "center",
                        }}>DOWNLOAD CV</button>
                    </div>
                )}
            </nav>

            {/* HERO */}
            <section id="home" style={{
                minHeight: "100vh", paddingTop: 70,
                background: "linear-gradient(160deg, #f0f9ff 0%, #ffffff 50%, #fff7ed 100%)",
                position: "relative", overflow: "hidden",
            }}>
                <div style={{ position: "absolute", top: 80, right: -100, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}14 0%, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 0, left: -80, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT2}10 0%, transparent 70%)`, pointerEvents: "none" }} />

                <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-10 pb-20 md:py-0 min-h-[calc(100vh-70px)] flex items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[60px] items-center w-full">
                        <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateX(0)" : "translateX(-40px)", transition: "all 0.9s cubic-bezier(0.4,0,0.2,1)" }}>
                            <div style={{ color: ACCENT2, fontWeight: 700, fontSize: 15, marginBottom: 12, letterSpacing: "0.04em" }}>Hai, Saya</div>
                            <h1 style={{ fontSize: "clamp(36px,5vw,54px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-1px", color: "#0f172a" }}>
                                Rizki Dwi Nur Utomo,<br />
                                <span style={{ color: ACCENT }}>Junior</span> Web Developer
                            </h1>
                            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.85, maxWidth: 460, marginBottom: 36, minHeight: 80 }}>
                                <TypewriterEffect text="Seorang mahasiswa dengan rasa ingin tahu yang tinggi terhadap teknologi terkini, sekaligus seorang Junior Web Developer yang selalu semangat untuk terus berkembang." />
                            </p>
                            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                                <button onClick={() => scrollTo("Portfolio")} style={{
                                    padding: "13px 30px", borderRadius: 8, border: "none", cursor: "pointer",
                                    background: ACCENT, color: "white", fontWeight: 700, fontSize: 15,
                                    boxShadow: `0 6px 20px ${ACCENT}44`, transition: "transform 0.2s",
                                }}
                                    onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; }}
                                    onMouseLeave={e => { e.target.style.transform = ""; }}>View Project</button>
                                <button onClick={() => scrollTo("Kontak")} style={{
                                    padding: "13px 30px", borderRadius: 8, cursor: "pointer",
                                    background: "transparent", color: ACCENT, fontWeight: 700, fontSize: 15,
                                    border: `2px solid ${ACCENT}`, transition: "background 0.2s",
                                }}
                                    onMouseEnter={e => { e.target.style.background = `${ACCENT}10`; }}
                                    onMouseLeave={e => { e.target.style.background = "transparent"; }}>Contact</button>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6 md:mt-0" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateX(0)" : "translateX(40px)", transition: "all 1s cubic-bezier(0.4,0,0.2,1) 0.2s" }}>
                            <div className="relative scale-75 sm:scale-90 md:scale-100">
                                <div style={{
                                    width: 360, height: 400,
                                    background: `linear-gradient(145deg, ${ACCENT}18, ${ACCENT2}10)`,
                                    borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    border: `2px solid ${ACCENT}20`,
                                    overflow: "hidden", // Tambahkan agar gambar tidak keluar batas lengkung
                                }}>
                                    {/* <div style={{ userSelect: "none", marginTop: 20, color: ACCENT }}><Laptop size={130} strokeWidth={1} /></div> */}
                                    {/* PENTING MENGGUNAKAN HURUF KAPITAL 'Profil.jpeg' */}
                                    <img src="/img/Profil.jpeg" alt="Rizki Dwi Nur Utomo" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                                </div>
                                <div style={{ position: "absolute", top: 24, left: -44, background: "white", borderRadius: 14, padding: "12px 16px", boxShadow: "0 8px 30px rgba(0,0,0,0.10)", display: "flex", alignItems: "center", gap: 10, animation: "floatA 3s ease-in-out infinite" }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}><Atom size={20} color="#2563eb" /></div>
                                    <div><div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Framework</div><div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>React.js</div></div>
                                </div>
                                <div style={{ position: "absolute", top: "42%", right: -52, background: ACCENT, borderRadius: 14, padding: "10px 14px", boxShadow: `0 8px 30px ${ACCENT}44`, animation: "floatC 4s ease-in-out infinite 1s" }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: "white" }}>● Available</div>
                                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>For Projects</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <svg style={{ position: "absolute", bottom: -1, left: 0, right: 0, width: "100%" }} viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
                    <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
                </svg>
            </section>

            {/* ABOUT */}
            <section id="about" style={{ background: "white", padding: "100px 0" }} ref={skillsRef}>
                <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                    <SectionLabel label="Tentang Saya" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mt-10 md:mt-12">
                        <div style={{ opacity: skillsInView ? 1 : 0, transform: skillsInView ? "translateX(0)" : "translateX(-30px)", transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)" }}>
                            <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 18, color: "#0f172a", lineHeight: 1.2 }}>
                                Developer yang <span style={{ color: ACCENT }}>Bersemangat</span> Membangun Produk Digital
                            </h2>
                            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.85, marginBottom: 16 }}>
                                Saya memiliki passion mendalam dalam membangun pengalaman web yang tidak hanya indah secara visual, tapi juga berkinerja tinggi dan mudah digunakan.
                            </p>
                            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.85, marginBottom: 28 }}>
                                Dengan latar belakang di UI/UX design dan pengembangan web, saya mampu menjembatani kebutuhan bisnis dengan solusi teknis yang tepat.
                            </p>
                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                {[
                                    { icon: <Briefcase size={16} color={ACCENT} />, text: "Semarang, ID" },
                                    { icon: <GraduationCap size={16} color={ACCENT} />, text: "S1 Teknik Informatika" },
                                ].map((item) => (
                                    <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#475569", background: "#f8fafc", padding: "8px 14px", borderRadius: 20, border: "1px solid #e2e8f0" }}>
                                        <span style={{ display: "flex" }}>{item.icon}</span><span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ opacity: skillsInView ? 1 : 0, transform: skillsInView ? "translateX(0)" : "translateX(30px)", transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s" }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 28, color: "#0f172a" }}>Keterampilan & Tools</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                {skills.map((s, i) => (
                                    <div key={s.name}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                            <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>{s.name}</span>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: ACCENT }}>{s.pct}%</span>
                                        </div>
                                        <div style={{ height: 8, borderRadius: 99, background: "#e2e8f0", overflow: "hidden" }}>
                                            <div style={{
                                                height: "100%", borderRadius: 99,
                                                background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})`,
                                                width: skillsInView ? `${s.pct}%` : "0%",
                                                transition: `width 1.1s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
                                                boxShadow: `0 2px 8px ${ACCENT}44`,
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" style={{ background: "#f8fafc", padding: "100px 0" }} ref={servicesRef}>
                <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                    <SectionLabel label="Layanan" center />
                    <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginTop: 12, marginBottom: 14, color: "#0f172a", letterSpacing: "-0.5px" }}>
                        Apa yang Saya <span style={{ color: ACCENT }}>Tawarkan</span>
                    </h2>
                    <p style={{ textAlign: "center", color: "#64748b", fontSize: 15, maxWidth: 500, margin: "0 auto 56px", lineHeight: 1.7 }}>
                        Layanan end-to-end dari desain hingga deployment untuk membantu bisnis Anda berkembang di era digital.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((s, i) => (
                            <div key={s.title} style={{
                                background: "white", borderRadius: 16, padding: 30,
                                border: "1px solid #e2e8f0", cursor: "default",
                                opacity: servicesInView ? 1 : 0,
                                transform: servicesInView ? "translateY(0)" : "translateY(30px)",
                                transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.08}s`,
                            }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 12px 40px ${ACCENT}20`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = `${ACCENT}44`; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
                            >
                                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${ACCENT}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 18 }}>{s.icon}</div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "#0f172a" }}>{s.title}</h3>
                                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PORTFOLIO */}
            <section id="portofolio" style={{ background: "white", padding: "100px 0" }} ref={portfolioRef}>
                <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                    <SectionLabel label="Portofolio" center />
                    <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginTop: 12, marginBottom: 14, color: "#0f172a", letterSpacing: "-0.5px" }}>
                        Proyek <span style={{ color: ACCENT }}>Unggulan</span>
                    </h2>
                    {portfolio.length > 0 ? (
                        <>
                            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48, marginTop: 32 }}>
                                {["Semua", "Web App", "Machine Learning", "E-Commerce", "LMS", "Telemedicine", "Dashboard", "Portfolio"].map(f => (
                                    <button key={f} onClick={() => setActiveFilter(f)} style={{
                                        padding: "8px 18px", borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                                        background: activeFilter === f ? ACCENT : "#f1f5f9",
                                        color: activeFilter === f ? "white" : "#64748b",
                                        border: activeFilter === f ? `1px solid ${ACCENT}` : "1px solid #e2e8f0",
                                        boxShadow: activeFilter === f ? `0 4px 14px ${ACCENT}44` : "none",
                                    }}>{f}</button>
                                ))}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map((p, i) => (
                                    <div key={p.title} style={{
                                        borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0", background: "white",
                                        opacity: portfolioInView ? 1 : 0,
                                        transform: portfolioInView ? "translateY(0)" : "translateY(30px)",
                                        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = "translateY(0)"; }}
                                    >
                                        <div style={{ height: 160, background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, overflow: "hidden", position: "relative" }}>
                                            {p.imageSrc ? (
                                                <img src={p.imageSrc} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                                            ) : (
                                                p.img
                                            )}
                                        </div>
                                        <div style={{ padding: 22 }}>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{p.cat}</div>
                                            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#0f172a" }}>{p.title}</h3>
                                            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>
                                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: p.source ? 18 : 0 }}>
                                                {p.tech.map(t => (
                                                    <span key={t} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "#f1f5f9", color: "#475569", fontWeight: 600 }}>{t}</span>
                                                ))}
                                            </div>
                                            {p.source && (
                                                <a href={p.source} target="_blank" rel="noreferrer" style={{
                                                    display: "inline-flex", alignItems: "center", gap: 8,
                                                    padding: "8px 16px", borderRadius: 8, background: "#0f172a",
                                                    color: "white", fontSize: 13, fontWeight: 600, textDecoration: "none",
                                                    transition: "transform 0.2s"
                                                }}
                                                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                                                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                                                >
                                                    <Github size={16} /> Source Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
                            <div style={{ display: "inline-flex", padding: 20, borderRadius: "50%", background: "#f1f5f9", marginBottom: 20 }}>
                                <Sparkles size={40} color="#94a3b8" />
                            </div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#334155", marginBottom: 8 }}>Belum Ada Proyek</h3>
                            <p style={{ fontSize: 15 }}>Portofolio akan segera ditambahkan di sini.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CONTACT */}
            <section id="kontak" style={{ background: "white", padding: "100px 0" }} ref={contactRef}>
                <div className="max-w-[1200px] mx-auto px-6 md:px-8">
                    <SectionLabel label="Kontak" center />
                    <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginTop: 12, marginBottom: 14, color: "#0f172a", letterSpacing: "-0.5px" }}>
                        Mari <span style={{ color: ACCENT }}>Berkolaborasi</span>
                    </h2>
                    <p style={{ textAlign: "center", color: "#64748b", fontSize: 15, maxWidth: 460, margin: "0 auto 60px", lineHeight: 1.7 }}>
                        Tertarik bekerja sama? Saya selalu terbuka untuk proyek baru, diskusi ide, atau sekadar ngobrol tentang teknologi!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[60px] items-start">
                        <div style={{ opacity: contactInView ? 1 : 0, transform: contactInView ? "translateX(0)" : "translateX(-30px)", transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {[
                                    { icon: <Mail size={22} color={ACCENT} />, label: "Email", value: "rizki.dnu@gmail.com", href: "mailto:rizki.dnur@gmail.com" },
                                    { icon: <Linkedin size={22} color={ACCENT} />, label: "LinkedIn", value: "linkedin.com/in/rizkidwinurutomo", href: "https://www.linkedin.com/in/rizki-dwi-nur-utomo-66074431b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                                    { icon: <Github size={22} color={ACCENT} />, label: "GitHub", value: "github.com/Heveann", href: "https://github.com/Heveann" },
                                    { icon: <MapPin size={22} color={ACCENT} />, label: "Lokasi", value: "Semarang, Jawa Tengah, Indonesia", href: null },
                                ].map(c => (
                                    <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 12, border: "1px solid #e2e8f0", background: "#f8fafc" }}>
                                        <div style={{ width: 42, height: 42, borderRadius: 12, background: `${ACCENT}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                                        <div>
                                            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 2 }}>{c.label}</div>
                                            {c.href ? <a href={c.href} style={{ fontSize: 14, color: "#334155", fontWeight: 600, textDecoration: "none" }}>{c.value}</a> : <span style={{ fontSize: 14, color: "#334155", fontWeight: 600 }}>{c.value}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ opacity: contactInView ? 1 : 0, transform: contactInView ? "translateX(0)" : "translateX(30px)", transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s" }}>
                            <div style={{ background: `linear-gradient(135deg, ${ACCENT}, #0284c7)`, borderRadius: 24, padding: 44, color: "white", position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                                <div style={{ position: "absolute", bottom: -30, left: -30, width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                                <div style={{ position: "relative" }}>
                                    <div style={{ marginBottom: 14 }}><Handshake size={48} color="white" /></div>
                                    <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Siap Memulai Proyek?</h3>
                                    <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.7, marginBottom: 30 }}>Saya akan merespons dalam 24 jam dan siap mendiskusikan proyek Anda secara detail.</p>
                                    <a href="mailto:rizki.dnur@gmail.com" style={{ display: "inline-block", padding: "13px 28px", borderRadius: 10, background: "white", color: ACCENT, fontWeight: 700, fontSize: 14, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
                                        Kirim Email Sekarang →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ background: "#0f172a", padding: "28px 0" }}>
                <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>© 2025 RizkiDev. All rights reserved.</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${ACCENT2}, #fbbf24)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 13 }}>A</div>
                        <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>Rizki<span style={{ color: ACCENT }}>Dev</span></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Built with React + Tailwind <Heart size={14} /></div>
                </div>
            </footer>

            <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)} }
        @keyframes blinkCursor { 50% { border-color: transparent } }
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        button{font-family:inherit}
      `}</style>
        </div>
    );
}