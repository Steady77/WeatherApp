// Tabs

const UI_ELEMS = {
    TAB_BUTTONS_WRAPPER: document.querySelector('.tabs__items'),
    TAB_BUTTONS: document.querySelectorAll('.tabs__item'),
    TAB_CONTENT: document.querySelectorAll('.tabs__content'),
};

function hideTabContent() {
    UI_ELEMS.TAB_CONTENT.forEach(item => {
        item.classList.remove('tabs__content--active');
    });

    UI_ELEMS.TAB_BUTTONS.forEach(item => {
        item.classList.remove('tabs__item--active');
    });
}

function showTabContent(i = 0) {
    UI_ELEMS.TAB_CONTENT[i].classList.add('tabs__content--active');
    UI_ELEMS.TAB_BUTTONS[i].classList.add('tabs__item--active');
}

hideTabContent();
showTabContent();

UI_ELEMS.TAB_BUTTONS_WRAPPER.addEventListener('click', event => {
    const target = event.target;
    const isTabButton = target.classList.contains('tabs__item');

    if (target && isTabButton) {
        UI_ELEMS.TAB_BUTTONS.forEach((item, i) => {
            if (item === target) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});
