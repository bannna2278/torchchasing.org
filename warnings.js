async function loadWarnings() {
    const feed = document.getElementById("warnings-feed");

    try {
        const response = await fetch("https://api.weather.gov/alerts/active", {
            headers: {
                "User-Agent": "(lpbogart2011@gmail.com)"
            }
        });

        const data = await response.json();
        feed.innerHTML = "";

        // ✅ Allowed events list
        const allowedEvents = [
            "Tornado Warning",
            "Tornado Watch",
            "Severe Thunderstorm Warning",
            "High Wind Warning",
            "Extreme Wind Warning",
            "Flood Warning",
            "Flash Flood Warning",
            "Tropical Storm Watch",
            "Tropical Storm Warning",
            "Hurricane Watch",
            "Hurricane Warning",
            "Storm Surge Watch",
            "Storm Surge Warning"
        ];

        // ✅ Filter alerts by event type
        const filtered = data.features.filter(alert =>
            allowedEvents.includes(alert.properties.event)
        );

        // ✅ No matching alerts?
        if (filtered.length === 0) {
            feed.innerHTML = `<div class="no-alerts">No active severe warnings.</div>`;
            return;
        }

        // ✅ Display each alert
        filtered.forEach(alert => {
            const title = alert.properties.headline || alert.properties.event;
            const desc = alert.properties.description || "No description available.";
            const severity = alert.properties.severity || "Unknown";

            const card = document.createElement("div");
            card.className = "alert-card";

            card.innerHTML = `
                <h3>${title}</h3>
                <p><strong>Severity:</strong> ${severity}</p>
                <p>${desc}</p>
            `;

            feed.appendChild(card);
        });

    } catch (error) {
        feed.innerHTML = `<div class="no-alerts">Error loading warnings.</div>`;
        console.error("NWS API error:", error);
    }
}

// ✅ Load immediately
loadWarnings();

// ✅ Refresh every 45 minutes
setInterval(loadWarnings, 45 * 60 * 1000);
