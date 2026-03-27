// Backend URL
const BACKEND_URL = 'https://portfolio-website-with-ai-back.onrender.com/api/chat'

let chatbotText = {}

export function chatbotComponentFunction(textData) {
	chatbotText = textData || {}
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
	typingDiv.textContent = chatbotText.typing
	messages.appendChild(typingDiv)
	messages.scrollTop = messages.scrollHeight

	fetch(BACKEND_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ message }),
	})
		.then((res) => {
			if (res.status === 429) throw new Error('rate_limit')
			if (!res.ok) throw new Error('server_error')
			return res.json()
		})
		.then((data) => {
			const typing = messages.querySelector('.typing-indicator')
			if (typing) typing.remove()
			chatbotAppendMessage(data.reply, 'bot')
		})
		.catch((err) => {
			const typing = messages.querySelector('.typing-indicator')
			if (typing) typing.remove()
			const msg = err.message === 'rate_limit' ? chatbotText.rateLimitError : chatbotText.defaultError
			chatbotAppendMessage(msg, 'bot')
		})
}

window.chatbotHandleKey = function(event) {
	if (event.key === 'Enter') chatbotSend()
}
