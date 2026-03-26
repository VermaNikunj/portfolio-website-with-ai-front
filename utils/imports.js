async function importComponent(textData) {
	if (!textData) return

	await Promise.all([
		import('../components/navigation/navigation.js')
			.then((module) => module.navigationComponentFunction(textData?.navigation))
			.catch((err) => showNotification(`Error while loading Navigation component: ${err}`, 'error')),

		import('../components/about/about.js')
			.then((module) => module.aboutComponentFunction(textData?.about))
			.catch((err) => showNotification(`Error while loading About component: ${err}`, 'error')),

		import('../components/skills/skills.js')
			.then((module) => module.skillsComponentFunction(textData?.skills))
			.catch((err) => showNotification(`Error while loading Skills component: ${err}`, 'error')),

		import('../components/experience/experience.js')
			.then((module) => module.experienceComponentFunction(textData?.experience))
			.catch((err) => showNotification(`Error while loading Experience component: ${err}`, 'error')),

		import('../components/certificate/certificate.js')
			.then((module) => module.certificateComponentFunction(textData?.certificate))
			.catch((err) => showNotification(`Error while loading Certificate component: ${err}`, 'error')),

		import('../components/projects/projects.js')
			.then((module) => module.projectsComponentFunction(textData?.projects))
			.catch((err) => showNotification(`Error while loading Projects component: ${err}`, 'error')),

		import('../components/education/education.js')
			.then((module) => module.educationComponentFunction(textData?.education))
			.catch((err) => showNotification(`Error while loading Education component: ${err}`, 'error')),
		
		import('../components/chatbot/chatbot.js')
			.then((module) => module.chatbotComponentFunction())
			.catch((err) => showNotification(`Error while loading Chatbot component: ${err}`, 'error'))
	])
}
