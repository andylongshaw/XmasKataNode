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
	children[name].present_list.small -= children[name].calculate_veg_offense_small_present_reduction(children[name].veg_offences);
    return children[name].present_list;
}

function add_child(name, type) {
    children[name] = {name:name, veg_offences:0};

    if (name == 'Bart')
    {
        children[name].present_list = {small:2, medium:3, large:1};
        children[name].calculate_veg_offense_small_present_reduction = function(offenses) { return offenses; }
    }
    else
    {
        children[name].present_list = {small:3, medium:2, large:0};
        children[name].calculate_veg_offense_small_present_reduction = function(offenses) { return offenses/2; }
    }

}

function child_action(name, type) {
	children[name].veg_offences++;
}