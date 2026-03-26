const NOTIFICATION_COLORS = {
	error:   { color: '#c0392b', icon: 'fa-circle-xmark',  title: 'Error' },
	success: { color: '#27ae60', icon: 'fa-circle-check',  title: 'Success' },
	info:    { color: '#2980b9', icon: 'fa-circle-info',   title: 'Info' },
}
let notificationTimer

function showNotification(message, type = 'info') {
	let toast = document.getElementById('app-notification')
	if (!toast) {
		toast = document.createElement('div')
		toast.id = 'app-notification'
		toast.className = 'app-notification'
		document.body.appendChild(toast)
	}

	clearTimeout(notificationTimer)
	toast.classList.remove('show')

	const { color, icon, title } = NOTIFICATION_COLORS[type] ?? NOTIFICATION_COLORS.info
	toast.style.background = color
	toast.style.setProperty('--toast-color', color)
	toast.innerHTML = `
		<div class="app-notification-header">
			<i class="fa-solid ${icon} app-notification-icon"></i>
			<span class="app-notification-title">${title}</span>
			<button class="app-notification-close" onclick="this.closest('#app-notification').classList.remove('show')">
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
		<p class="app-notification-message">${message}</p>
		<div class="app-notification-progress"></div>
	`

	requestAnimationFrame(() => {
		toast.classList.add('show')
		notificationTimer = setTimeout(() => toast.classList.remove('show'), 4000)
	})
}
