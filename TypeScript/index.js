var 철수쌤 = { subject: 'math' };
var 영희쌤 = { subject: ['science', 'english'] };
var 민수쌤 = { subject: ['science', 'art', 'korean'] };
function teachersubject(x) {
    if (typeof x.subject === 'string') {
        return x.subject;
    }
    else {
        return x.subject[x.subject.length - 1];
    }
}
console.log(teachersubject(철수쌤));
console.log(teachersubject(영희쌤));
console.log(teachersubject(민수쌤));
