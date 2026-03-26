export function experienceComponentFunction(textData) {
	const componentElement = document.querySelector('#experience-component')
	loadExperienceList(textData, componentElement)
}

function loadExperienceList(textData, componentElement) {
	const expList = textData.list
	const dotsNavElement = getDotNavHTML(expList, textData, componentElement)
	const timelineElement = getTimelineHTML(expList, textData)
	componentElement.append(dotsNavElement, timelineElement)
}

function getDotNavHTML(expList, textData, componentElement) {
	const dotsNavElement = document.createElement('div')
	dotsNavElement.classList.add('experience-dots-nav')
	for (let i = 0; i < expList.length; i++) {
		const title = expList[i]
		const dotElement = document.createElement('div')
		dotElement.classList.add('experience-dot')
		dotElement.setAttribute('title', textData[`${title}Title`] || title)
		dotElement.dataset.index = i
		if (i === 0) dotElement.classList.add('dot-active')

		dotElement.addEventListener('click', () => {
			componentElement.querySelectorAll('.experience-dot').forEach(d => d.classList.remove('dot-active'))
			componentElement.querySelectorAll('.experience-item').forEach(item => item.classList.remove('experience-item-active'))
			dotElement.classList.add('dot-active')
			const targetItem = componentElement.querySelector(`.experience-item[data-index="${i}"]`)
			if (targetItem) {
				targetItem.classList.add('experience-item-active')
				targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' })
			}
		})

		const dotLabelElement = document.createElement('span')
		dotLabelElement.classList.add('experience-dot-label')
		dotLabelElement.setAttribute('data-i18n', `experience.${title}Date`)
		dotElement.appendChild(dotLabelElement)
		dotsNavElement.appendChild(dotElement)
	}
	return dotsNavElement
}

function getTimelineHTML(expList, textData) {
	const timelineElement = document.createElement('div')
	timelineElement.classList.add('experience-timeline')
	for (let i = 0; i < expList.length; i++) {
		const title = expList[i]
		const experienceItemElement = getExperienceItemHTML(title, textData, i)
		timelineElement.appendChild(experienceItemElement)
	}
	return timelineElement
}

function getExperienceItemHTML(title, textData, i) {
	const experienceListElement = document.createElement('div')
	experienceListElement.classList.add('experience-item')
	experienceListElement.dataset.index = i
	if (i === 0) experienceListElement.classList.add('experience-item-active')
	const leftDivElement = getLeftItemHTML(title, textData)
	const rightDivElement = getRightItemHTML(title, textData)
	experienceListElement.append(leftDivElement, rightDivElement)
	return experienceListElement
}

function getProfileDetailHTML(title, textData) {
	const parentElement = document.createElement('div')
	parentElement.classList.add('experience-profile-detail', 'showProfile')
	const numberOfProfile = textData[`numberOf${title}Profile`]
	for (let i = numberOfProfile; i > 0; i--) {
		const titleName = `${title}ProfileTitle_${i}`
		const date = `${title}ProfileDate_${i}`
		if (titleName && date) {
			const itemElement = document.createElement('div')
			itemElement.classList.add('profile-item')

			const nameElement = document.createElement('span')
			nameElement.classList.add('profile-item-name')
			nameElement.setAttribute('data-i18n', `experience.${titleName}`)
			const dateElement = document.createElement('span')
			dateElement.classList.add('profile-item-date')
			dateElement.setAttribute('data-i18n', `experience.${date}`)

			itemElement.appendChild(nameElement)
			itemElement.appendChild(dateElement)
			parentElement.appendChild(itemElement)
		}
	}
	return parentElement
}

function getLeftItemHTML(title, textData) {
	const leftDivElement = document.createElement('div')
	leftDivElement.classList.add('experience-left')

	const dateDivElement = document.createElement('div')
	dateDivElement.classList.add('experience-date')
	dateDivElement.setAttribute('data-i18n', `experience.${title}Date`)

	const titleDivElement = document.createElement('div')
	titleDivElement.classList.add('experience-title')
	titleDivElement.setAttribute('data-i18n', `experience.${title}Title`)

	const profileDetailElement = getProfileDetailHTML(title, textData)

	const frag = document.createDocumentFragment()
	frag.append(dateDivElement, titleDivElement, profileDetailElement)

	leftDivElement.appendChild(frag)
	return leftDivElement
}

function getRightItemHTML(title, textData) {
	const contentElement = document.createElement('div')
	contentElement.classList.add('experience-content')
	const contentList = textData[`${title}Content`]
	for (let i = 0; i < contentList.length; i++) {
		const content = contentList[i]
		const titleElement = getContentTitleHTML(content, i)
		const descElement = getContentDescHTML(title, content, textData)
		contentElement.appendChild(titleElement)
		contentElement.appendChild(descElement)
	}
	return contentElement
}

function getContentTitleHTML(title, index) {
	const titleElement = document.createElement('div')
	titleElement.classList.add('content-title')
	if (index > 0) titleElement.classList.add('margin-top-30')

	const spanElement = document.createElement('span')
	spanElement.setAttribute('data-i18n', `experience.${title}`)
	titleElement.appendChild(spanElement)

	return titleElement
}

function getContentDescHTML(title, content, textData) {
	const descElement = document.createElement('div')
	descElement.classList.add('content-desc')
	const ulElement = document.createElement('ul')
	const count = textData[`numberOf${title}${content}`]
	for (let i = 1; i <= count; i++) {
		const desc = `${title}${content}_${i}`
		if (desc) {
			const liElement = document.createElement('li')
			liElement.setAttribute('data-i18n', `experience.${desc}`)
			ulElement.appendChild(liElement)
		}
	}
	descElement.appendChild(ulElement)
	return descElement
}
