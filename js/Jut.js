// Javascript Utilities

function Jut_() {}

Jut_.prototype.clone = function(obj)
{
	if (obj == null || typeof(obj) !== "object" || obj instanceof HTMLElement)
	{
        return obj;
    }

	return Object.assign({}, this.clone(obj));;
}

var Jut = new Jut_();
