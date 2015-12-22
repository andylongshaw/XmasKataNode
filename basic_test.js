var test = require('tape');

var TODDLER = 1;
var BRAT = 3;

var NOT_EAT_VEG = 1;


test('two vegetable refusals lose toddler a present', function (t) {
    t.plan(1);

    children = [];

    add_child('Maggie', TODDLER);

    child_action('Maggie', NOT_EAT_VEG);
    child_action('Maggie', NOT_EAT_VEG);

    var present_list = get_present_list_for('Maggie')

    t.equal(present_list.small, 2);
});

test('two vegetable refusals lose brat two presents', function (t) {
    t.plan(1);

    children = [];

    add_child('Bart', BRAT);

    child_action('Bart', NOT_EAT_VEG);
    child_action('Bart', NOT_EAT_VEG);

    var present_list = get_present_list_for('Bart')

    t.equal(present_list.small, 0);
});

test('toddler neither naughty nor nice', function (t) {
    t.plan(3);

    children = [];

    add_child('Maggie', TODDLER);

    var present_list = get_present_list_for('Maggie')

    t.equal(present_list.small, 3);
    t.equal(present_list.medium, 2);
    t.equal(present_list.large, 0);
});

var children = [];

function get_present_list_for(name) {
	var present_list = {small:3, medium:2, large:0};
	if (name == 'Bart')
		present_list.small -= children[name].veg_offences;
	else
		present_list.small -= children[name].veg_offences/2;
	return present_list;
}

function add_child(name, type) {
	var present_list = {small:3, medium:2, large:0};
	children[name] = {name:name, present_list:present_list, veg_offences:0};
}

function child_action(name, type) {
	children[name].veg_offences++;
}