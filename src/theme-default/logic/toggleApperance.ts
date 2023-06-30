const classList = document.documentElement.classList;
const APPEARANCE_KEY = 'appearance';

const setClassList = (isDark = false) => {
  if (isDark) {
    classList.add('dark');
    localStorage.setItem(APPEARANCE_KEY, 'light');
  } else {
    classList.remove('dark');
    localStorage.setItem(APPEARANCE_KEY, 'dark');
  }
};
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  setClassList(localStorage.getItem(APPEARANCE_KEY) === 'light');
  window.addEventListener('storage', () => {
    setClassList(localStorage.getItem(APPEARANCE_KEY) === 'light');
  });
}
export function toggle() {
  setClassList(!classList.contains('dark'));
}
