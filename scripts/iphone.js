const dir_update = () => {
    const grid = document.getElementById("grid")
    grid.style.height = "unset"
    if (window.innerWidth > 812)
        grid.style.height = (grid.clientHeight / 2) + "px"
}

const scrollTo = id => {
    const pos = document
        .getElementById(id)
        .getBoundingClientRect()
        .top
        - 100
    console.log(pos)
    window.scrollTo({ top: pos, behavior: 'smooth' })
}

const makeGrid = () => {
    u({
        "#grid": data.map(i => {
            const checked = document.querySelector(".checked")
            if (checked) {
                const tag = checked
                    .src
                    .split('/')
                    .pop()
                    .replace(/tags_(.*)\.svg/, "$1")
                if (i.format != tag)
                    return ""
            }
            i.urlHost = `Open ${new URL(i.url)
                .hostname
                .replace("www.", "")
                .toLowerCase()} in new tab`

            i.mediaAuth = i.author ? [i.media, i.author].join(" | ") : i.media

            return {
                div: [
                    "mediaAuth",
                    "title",
                    "blurb",
                    "urlHost"]
                    .map(x =>
                        i[x] ? { p: i[x], class: x } : ""
                    ),
                class: "cell",
                onclick: `window.open("${i.url}",'_blank')`
            }
        })
    })
    dir_update()
}

// let tshirtPlayed = false

onload = () => {

    document.getElementById("ham").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    document.querySelectorAll("nav svg").forEach(i => {
        i.addEventListener("click", () => {
            scrollTo(i.id.slice(0, -4))
        })
    })

    makeGrid()

    document.querySelectorAll("#tags img").forEach(i => {
        i.addEventListener("click", event => {
            let old = document.querySelector(".checked")
            if (old) {
                old.classList.remove("checked")
                if (old.src == event.target.src)
                    return makeGrid()
            }
            event.target.classList.add("checked")
            makeGrid()
            document.getElementById('spoint').scrollIntoView({ behavior: "smooth" })
        })
    })


}

onscroll = () => {
    const om = document.getElementById('our_mission'),
        distanceToTop = om.getBoundingClientRect().top,
        headerOver = document.getElementById("headerOver"),
        ham = document.getElementById("ham")
    if (distanceToTop > 40) {
        if (headerOver.classList.contains("none"))
            headerOver.classList.remove("none")
        ham.classList.add("none")
    }
    else {
        headerOver.classList.add("none")
        if (ham.classList.contains("none"))
            ham.classList.remove("none")

    }
}

touchmove = () => {
    navUpdate()
}

onresize = () => {
    dir_update()
}