export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // код с обработкой очистки поля
        if (action && action.name === 'clear') {    // Если событие = clear, то ищем родителя кнопки, вызвавшей событие
            const parentAction = action.parentElement;
            if (parentAction) {
                const elInput = parentAction.querySelector('input'); // поиск input рядом с нашей кнопкой
                if (elInput) {
                    elInput.value = ''; // сброс поля ввода value
                    state[action.dataset.field] = '';   // сброс поля в state
                }
            }
        }

        // @todo: #4.5 — отфильтровать данные, используя компаратор
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }
}
/*
import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                // Получаем ключи из объекта
      .forEach((elementName) => {                       // Перебираем по именам
        elements[elementName].append(                   // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])      // формируем массив имён, значений опций
                      .map(name => {                    // используйте name как значение и текстовое содержимое
                        const tag = document.createElement('option');
                        tag.setAttribute('value', name);
                        tag.textContent = name;
                        return tag; // @todo: создать и вернуть тег опции
                      })
        )
     })
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}
*/