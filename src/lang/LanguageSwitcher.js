import i18n from "./i18n";
import {Select} from "antd";

const LanguageSwitcher = () => {

    const handleChange = (value) => {
        console.log(value)
        localStorage.setItem("label",value.label)
        localStorage.setItem("value",value.value)
        i18n.changeLanguage(localStorage.getItem("value"));
    };
    if(!localStorage.getItem("value")){
        localStorage.setItem("value","uz")
        localStorage.setItem("label","O'zbek 🇺🇿")
    }
    return (
        <div className="languageSwitcher alian">
            <Select
                size={"large"}

                labelInValue
                defaultValue={{
                    value: localStorage.getItem("value"),
                    label: localStorage.getItem("label"),
                }}
                style={{
                    width: 150,
                }}
                onChange={handleChange}
                const options = {[
                {
                    value: 'ru',
                    label: 'Русский ',
                },
                {
                    value: 'uz',
                    label: "O'zbek",
                },
                
                ]}
            />
        </div>
    );
};

export default LanguageSwitcher;
