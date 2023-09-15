import styles from "./SectionHome.module.scss";
import Link from "next/link";

const SectionHome = () => {
    const inProgressList = [
        {
            categoryName: "In progress",
            urlList: [
                { name: "Journey Game 3", url: "/fiber/journey-game3" },
                {
                    name: "Model emoji 1",
                    url: "/fiber/model-emoji-1",
                },
            ],
        },
        {
            categoryName: "To do",
            urlList: [
                { name: "URL simple db system", url: "/blender/geometry-node" },
                { name: "In water environment", url: "/blender/ai-render" },
            ],
        },
    ]
    const historyList = [
        {
            categoryName: "Fiber",
            urlList: [
                { name: "Journey Game 1", url: "/fiber/journey-game1" },
                { name: "Journey Game 2", url: "/fiber/journey-game2" },
                {
                    name: "Journey-Physics-Base",
                    url: "/fiber/journey-physics",
                },
                {
                    name: "Journey-Physics-GLTF",
                    url: "/fiber/journey-physics-gltf",
                },
                {
                    name: "Journey-Env",
                    url: "/fiber/journey-env",
                },
                {
                    name: "Journey-Env-Model",
                    url: "/fiber/journey-env-model",
                },
                {
                    name: "Journey-Models",
                    url: "/fiber/journey-models",
                },
                {
                    name: "Journey-Stage",
                    url: "/fiber/journey-stage",
                },
                {
                    name: "Journey-Postprocess",
                    url: "/fiber/journey-postprocess",
                },
                { name: "Animating with triangles 1", url: "/fiber/animating-tri1" },
                { name: "Animating with triangles 2", url: "/fiber/animating-tri2" },
                { name: "Animating with triangles 3", url: "/fiber/animating-tri3" },
                { name: "Animating with triangles 4", url: "/fiber/animating-tri4" },
                { name: "Animating with triangles 5", url: "/fiber/animating-tri5" },
                { name: "Animating with triangles 6", url: "/fiber/animating-tri6" },
                { name: "Animating with triangles 7", url: "/fiber/animating-tri7" },
                {
                    name: "Model emoji 1",
                    url: "/fiber/model-emoji-1",
                },
                { name: "Eye with maths", url: "/fiber/eye-with-maths" },
                { name: "Gameboy Material 1", url: "/fiber/gameboy-material1" },
                { name: "Models", url: "/fiber/models" },
                { name: "Vertex-Fragnent", url: "/fiber/vertex-fragnent" },
                { name: "Fragnent-Time", url: "/fiber/fragnent-time" },
                { name: "Fragnent-Still", url: "/fiber/fragnent-still" },
                { name: "Drei-Portal", url: "/fiber/drei-portal" },
                { name: "Raymarch101-frag1", url: "/fiber/raymarch101-frag1" },
                { name: "Raymarch101-frag2", url: "/fiber/raymarch101-frag2" },
                { name: "Raymarch101-frag3", url: "/fiber/raymarch101-frag3" },
                { name: "Raymarch101-frag4", url: "/fiber/raymarch101-frag4" },
                { name: "Raymarch101-frag5", url: "/fiber/raymarch101-frag5" },
                { name: "Raymarch101-frag6", url: "/fiber/raymarch101-frag6" },
                { name: "Raymarch101-frag7", url: "/fiber/raymarch101-frag7" },
            ],
        },
        {
            categoryName: "Front",
            urlList: [
                { name: "Lottie-Files", url: "/front//lottie-file/basic" },
            ],
        },
        {
            categoryName: "P5",
            urlList: [
                { name: "Boid", url: "/p5/boid" },
                { name: "Vector Field", url: "/p5/vfa" },
            ],
        },
        {
            categoryName: "Blender",
            urlList: [
                { name: "Geometry Node", url: "/blender/geometry-node" },
                { name: "AI Render", url: "/blender/ai-render" },
            ],
        },
        {
            categoryName: "Design",
            urlList: [{ name: "UI", url: "/design/ui" }],
        },
    ];

    return (
        <section className="sectionHome">
            <ul className={styles.categories}>
                {inProgressList.map((categoryItem, categoryIndex) => {
                    return (
                        <li className={styles.category} key={categoryIndex}>
                            <h2 className={styles.categoryName}>
                                {categoryItem.categoryName}
                            </h2>
                            <ul className={styles.urlList}>
                                {categoryItem.urlList.map((routeItem, routeIndex) => {
                                    return (
                                        <li key={routeIndex} className={styles.urlLink}>
                                            <Link href={routeItem.url}>{routeItem.name}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
            <br /><br />
            <ul className={styles.categories}>
                {historyList.map((categoryItem, categoryIndex) => {
                    return (
                        <li className={styles.category} key={categoryIndex}>
                            <h2 className={styles.categoryName}>
                                {categoryItem.categoryName}
                            </h2>
                            <ul className={styles.urlList}>
                                {categoryItem.urlList.map((routeItem, routeIndex) => {
                                    return (
                                        <li key={routeIndex} className={styles.urlLink}>
                                            <Link href={routeItem.url}>{routeItem.name}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default SectionHome;
