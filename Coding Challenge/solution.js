/**
 * Calculates a possible valid assignment of peron to activity with no overlapping times for each person.
 * May return "IMPOSSIBLE" for a particular case if there are no valid schedules that complete all activities.
 * @param {string} inputString the input of test cases.
 * @param {string} personIdentifiers optional list of person identifiers, one character per person.
 * @return {string} The calculated schedule, with each test case on a new line.
 */
function householdSchedule(inputString, personIdentifiers = "CJ"){
	var cases = stringToCasesArray(inputString);
	
	//an error of "output" type has been generated when parsing the input, pass it to the user
	if(typeof(cases) == "string"){
		return cases;
	}
	
	var results = [];
	
	for(const [caseIndex, activities] of Object.entries(cases)){
		//store unsorted activity index
		activities.forEach((activity, index) => (activity.originalIndex = index));
		
		//sort chronologically by start
		activities.sort((a, b) => a.start - b.start);
		
		//users used to keep track of what our
		var people = personIdentifiers.split('').map((identifier) => ({"identifier": identifier, "busyUntil": 0, "workDone": 0}));
		
		var caseResult = new Array(activities.length + 1);
		
		for(const activity of activities){
			var assignedPersonIndex = -1;
			for(var [personIndex, person] of Object.entries(people)){
				//note: arbitrary descision to assign activities to whoever has done least so far in an imperfect but simple attempt to balance work load
				if(person.busyUntil <= activity.start && (assignedPersonIndex < 0 || person.workDone < people[assignedPersonIndex].workDone)){
					assignedPersonIndex = personIndex;
				}
			}
			
			if(assignedPersonIndex < 0){
				//if we never got an assignedPersonIndex, everyone is busy
				caseResult = ["IMPOSSIBLE"];
				break;
			}
			
			//update solution string
			caseResult[activity.originalIndex] = people[assignedPersonIndex].identifier;
			
			//update person
			people[assignedPersonIndex].workDone += activity.end - activity.start;
			people[assignedPersonIndex].busyUntil = activity.end;
		}
		//format result
		results.push("Case #" + (1*caseIndex + 1) + ": " + caseResult.join(''));
	}
	
	return results.join("\n");
}

/**
 * Converts the string to an array of cases, with an array of activity.
 * @param {string} inputString the input of test cases.
 * @param {string} personIdentifiers optional list of person identifiers, one character per person.
 * @return {string} The calculated schedule, with each test case on a new line.
 */
function stringToCasesArray(inputString){
	var lines = inputString.replaceAll("\r",'').split('\n');
	var cases = [];
	var casesCount;
	var currentCase = -1;//starting at -1 so incrementing when starting the case positions the first case at 0
	var activitiesCount;
	var currentActivity = -1;//starting at -1 so incrementing when starting the activity positions the first activity at 0
	for(const [lineNumber, line] of Object.entries(lines)){
		if(line.length < 1){
			//empty line, skip
			continue;
		}
		
		if(casesCount == null){
			//this line should contain the number of cases
			casesCount = Number(line);
			
			if(isNaN(casesCount)){
				return error("Input Error: Cases count is not a number on line " + (lineNumber*1+1));
			}
			if(isNaN(casesCount)){
				error("Input Error: Expected case count on line " + (lineNumber*1+1));
			}
		}else if(activitiesCount == null || currentActivity + 1 >= activitiesCount){
			//this line should contain the number of activities in a case
			activitiesCount = Number(line);
			currentCase++;
			
			if(isNaN(activitiesCount)){
				return error("Input Error: Activities count is not a number on line " + (lineNumber*1+1));
			}
			if(isNaN(activitiesCount)){
				return error("Input Error: Expected new case count on line " + (lineNumber*1+1));
			}
			if(currentCase >= casesCount){
				return error("Input Error: More cases than expected on line " + (lineNumber*1+1));
			}
			
			cases[currentCase] = [];
			currentActivity = -1;//starting at -1 so incrementing when starting the activity positions the first activity at 0
			continue;
		}else{
			//this line should contain an activity
			var [start, end] = line.split(' ');
			currentActivity++;
			
			if(isNaN(start)){
				return error("Input Error: Start time is not a number on line " + (lineNumber*1+1));
			}
			if(isNaN(end)){
				return error("Input Error: End time is not a number on line " + (lineNumber*1+1));
			}
			if(start*1 > end*1){
				return error("Input Error: End time is earlier than start time on line " + (lineNumber*1+1));
			}
			
			cases[currentCase][currentActivity] = {"start": start*1, "end": end*1};
		}
	}
	
	if(currentActivity + 1 < activitiesCount){
		//we only need to check for enough activites in the last case
		//since it would normally be detected when trying to start a new case
		return error("Input Error: Missing next activity for final case");
	}
	
	return cases;
}

/**
 * Displays an error in requested method
 * @param {string} message to pass to user.
 * @param {string} errorType optional, either "output" (to return a string error) or "exception" (to throw an exception of the error).
 * @return {string} the message if the "output" error message has been selected
 */
function error(message, errorType = "output"){
	if(errorType == "output"){
		return message;
	}else if(errorType == "exception"){
		throw new Error(message);
	}
}


/*
var inputString = "4\n3\n360 480\n420 540\n600 660\n3\n0 1440\n1 3\n2 4\n5\n99 150\n1 100\n100 301\n2 5\n150 250\n2\n0 720\n720 1440";

var output = householdSchedule(inputString);
console.log(output);
*/