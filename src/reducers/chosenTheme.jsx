import styles from '../../src/Components/LoginForm/Form.module.css'

export const chosenTheme = (state, action) => {
    console.log("action.type", action.type);
    console.log("action", action);
    switch (action.type) {
        case 'dark': {
            return [...state, action.value]

        }
        default: return 'light'
    }
}