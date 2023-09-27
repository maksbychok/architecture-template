const statuses = {
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
    ERROR: 'error',
}

function isValid(val) {
    return Object.values(statuses).some(i => i === val);
}
module.exports = {
    isValid,
    ...statuses
};