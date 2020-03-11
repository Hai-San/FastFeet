class SanitizeFileName {
    sanitize(string) {
        const specialChars =
            'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';

        const normalChars =
            'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';

        const p = new RegExp(specialChars.split('').join('|'), 'g');

        return string
            .toString()
            .toLowerCase()
            .replace(p, c => normalChars.charAt(specialChars.indexOf(c))) // Replace special characters
            .replace(/[^a-z0-9]/gi, '-') // Reforce remove special characters
            .replace(/--+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text
            .substring(0, 128); // Max lenght string
    }
}

export default new SanitizeFileName().sanitize;
