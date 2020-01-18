import LintError from './linterror.js';

class WarningTextSizeShouldBeEqual extends LintError {
    constructor(location)
    {
        super({code: 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL', error: 'Тексты в блоке warning должны быть одного размера.', location});
    }
}

class WarningInvalidButtonSize extends LintError {
    constructor(location)
    {
        super({code: 'WARNING.INVALID_BUTTON_SIZE', error: 'Размер кнопки в блоке warning должен быть на 1 шаг больше эталонного.', location});
    }
}

class WarningInvalidButtonPosition extends LintError {
    constructor(location)
    {
        super({code: 'WARNING.INVALID_BUTTON_POSITION', error: 'Блок button в блоке warning должен быть после блока placeholder.', location});
    }
}

class WarningInvalidPlaceholderSize extends LintError {
    constructor(location)
    {
        super({code: 'WARNING.INVALID_PLACEHOLDER_SIZE', error: 'Допустимые размеры для блока placeholder в блоке warning: s, m, l.', location});
    }
}

class TextSeveralH1 extends LintError {
    constructor(location)
    {
        super({code: 'TEXT.SEVERAL_H1', error: 'Заголовок первого уровня на странице должен быть единственным.', location});
    }
}

class TextInvalidH2Position extends LintError {
    constructor(location)
    {
        super({code: 'TEXT.INVALID_H2_POSITION', error: 'Заголовок второго уровня не может находиться перед заголовком первого уровня.', location});
    }
}

class TextInvalidH3Position extends LintError {
    constructor(location)
    {
        super({code: 'TEXT.INVALID_H3_POSITION', error: 'Заголовок третьего уровня не может находиться перед заголовком второго уровня.', location});
    }
}

class GridTooMuchMarketingBlocks extends LintError {
    constructor(location)
    {
        super({code: 'GRID.TOO_MUCH_MARKETING_BLOCKS', error: 'Маркетинговые блоки не могут занимать больше половины от всех колонок блока grid', location});
    }
}

export {
    WarningTextSizeShouldBeEqual,
    WarningInvalidButtonSize,
    WarningInvalidButtonPosition,
    WarningInvalidPlaceholderSize,
    TextSeveralH1,
    TextInvalidH2Position,
    TextInvalidH3Position,
    GridTooMuchMarketingBlocks
}