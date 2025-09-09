function stringRotation(s1, s2) {
    for (let i = 0; i < s1.length; i++) {
        if (s1 === s2) {
            return true;
        }
        let last = s1[s1.length - 1];
        s1 = last + s1.slice(0, s1.length - 1);
        console.log(s1)
    }
    return false;
}

console.log(stringRotation("abcdef", "cdefab"));