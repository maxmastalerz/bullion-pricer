const toFixedNumber = (num, digits) => {
    const pow = Math.pow(10, digits);
    return Math.round(num*pow) / pow;
}

const formatNumber = (num) => {
    if (num >= 1000000) { // If the number is greater than 1M
        return toFixedNumber(num/1000000, 2).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + 'M';
    } else if (num >= 100000) { // If the number is greater than 100k
        return toFixedNumber(num/1000, 1).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + 'K';
    } else if (num >= 10000) { // If the number is greater than 10k
        return toFixedNumber(num/1000, 2).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + 'K';
    } else { // If the number is less than 10k
        return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}

module.exports = { formatNumber };