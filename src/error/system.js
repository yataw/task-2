
/**
 * @fileoverview Неразрешимые ошибки, после которых прекращаем работу. Их число может сокращаться
 * по мере добавления новых правил в линтер.
 */
class InvalidInput extends Error {
    constructor() {
        super("Invalid input");
    }
}

class NoTextNode extends Error {
    constructor() {
        super("At least 1 text node expected");
    }
}

export {
    InvalidInput,
    NoTextNode
}