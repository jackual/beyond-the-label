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
    navUpdate()

    document.getElementById("hamburger").addEventListener("click", () => {
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

    //setInterval(navUpdate, 10)

}

const navUpdate = () => {

    // console.clear();

    [
        document.getElementById("logo"),
        ...document.querySelectorAll("nav svg g")
    ].map(i => {
        i.className = ""
        const a = i.getBoundingClientRect().bottom,
            b = document.getElementById("our_mission")
                .getBoundingClientRect().top,
            o = ((b - a) / 50)
        console.log(i.id, a, b, o)
        if (window.scrollY < 20) {
            i.style.setProperty("opacity", "1", "important")
        }
        else {
            i.style.setProperty("opacity", o, "important")
        }
        if (o < 0) {
            i.style.setProperty("visibility", "hidden")
        }
        else
            i.style.setProperty("visibility", "visible")
        if (i.id == "resources_nav") {
            const hamburger = document.getElementById("hamburger")
            hamburger.style.setProperty("opacity", o > 0 ? "0" : "1")
            if (o > 0)
                hamburger.style.setProperty("visibility", "hidden")
            else
                hamburger.style.setProperty("visibility", "visible")
        }

        if (i.id == "logo") {
            const labelLogo = document.getElementById("labelLogo")
            if (o > 0)
                labelLogo.style.setProperty("display", "none")
            else
                labelLogo.style.setProperty("display", "unset")
        }
    })
}

onscroll = () => {
    navUpdate()
    const om = document.getElementById('our_mission'),
        distanceToTop = om.getBoundingClientRect().top,
        headerOver = document.getElementById("headerOver")
    if (distanceToTop > 0) {
        if (headerOver.classList.contains("none"))
            headerOver.classList.remove("none")
    }
    else {
        headerOver.classList.add("none")
        /*
        tshirt video loops so not needed
        
        if (!tshirtPlayed) {
            const tshirt = document.getElementById("tshirt")
            tshirt.defaultPlaybackRate = 0.5
            tshirt.play()
            tshirtPlayed = true
        }*/
    }
}

touchmove = () => {
    navUpdate()
}

onresize = () => {
    dir_update()
}