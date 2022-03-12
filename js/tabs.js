export const tabs = ({ TAB_CONTENT, TAB_BUTTONS, TAB_BUTTONS_WRAPPER }) => {
    function hideTabContent() {
        TAB_CONTENT.forEach(item => {
            item.classList.remove('tabs__content--active');
        });

        TAB_BUTTONS.forEach(item => {
            item.classList.remove('tabs__item--active');
        });
    }

    function showTabContent(i = 0) {
        TAB_CONTENT[i].classList.add('tabs__content--active');
        TAB_BUTTONS[i].classList.add('tabs__item--active');
    }

    hideTabContent();
    showTabContent();

    TAB_BUTTONS_WRAPPER.addEventListener('click', event => {
        const target = event.target;
        const isTabButton = target.classList.contains('tabs__item');

        if (target && isTabButton) {
            TAB_BUTTONS.forEach((item, i) => {
                if (item === target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};
