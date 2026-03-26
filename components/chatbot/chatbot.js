// Local Host - temporary URL
const BACKEND_URL = 'http://localhost:8080/api/chat'

export function chatbotComponentFunction() {
	const container = document.getElementById('chatbot-component')
	fetch('components/chatbot/chatbot.html')
		.then((res) => res.text())
		.then((html) => {
			container.innerHTML = html
		})
}

function chatbotAppendMessage(text, sender) {
	const messages = document.getElementById('chatbot-messages')
	const div = document.createElement('div')
	div.classList.add('chatbot-msg', sender)
	div.textContent = text
	messages.appendChild(div)
	messages.scrollTop = messages.scrollHeight
}

window.chatbotSend = function() {
	const input = document.getElementById('chatbot-input')
	const message = input.value.trim()
	if (!message) return

	chatbotAppendMessage(message, 'user')
	input.value = ''

	const messages = document.getElementById('chatbot-messages')
	const typingDiv = document.createElement('div')
	typingDiv.classList.add('chatbot-msg', 'bot', 'typing-indicator')
	typingDiv.textContent = 'Typing...'
	messages.appendChild(typingDiv)
	messages.scrollTop = messages.scrollHeight

	fetch(BACKEND_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ message }),
	})
		.then((res) => res.json())
		.then((data) => {
			const typing = messages.querySelector('.typing-indicator')
			if (typing) typing.remove()
			chatbotAppendMessage(data.reply, 'bot')
		})
		.catch(() => {
			const typing = messages.querySelector('.typing-indicator')
			if (typing) typing.remove()
			chatbotAppendMessage('Sorry, something went wrong. Please try again.', 'bot')
		})
}

window.chatbotHandleKey = function(event) {
	console.log('SAA')
	if (event.key === 'Enter') chatbotSend()
}
