def letter_grade_lookup(grade) :
    
    if grade == "A+":
        grade = 4
    elif grade == "A":
        grade = 4
    elif grade == "A-":
        grade = 3.7
    elif grade == "B+":
            grade = 3.3
    elif grade == "B":
            grade = 3
    elif grade == "B-":
            grade = 2.7
    elif grade == "C+":
        grade = 2.3
    elif grade == "C":
            grade = 2
    elif grade == "C-":
            grade = 1.7
    elif grade == "D+":
            grade = 1.3
    elif grade == "D":
            grade = 1
    elif grade == "D-":
            grade = 0.7
    else:
            grade = 0.0

    return grade
    
def compute_semester_average(semester) :

        cumulativeGrades = {}
        num_students = 0.0
        cum_total = 0.0
        avg = 0.0


        for key in semester:
            excluded_keys = ["Other", "course", "professor", "section", "semester"]
            if key not in excluded_keys:
                if key not in cumulativeGrades:
                    cumulativeGrades[key] = 0
                cumulativeGrades[key] += (semester[key] * letter_grade_lookup(key))
                num_students += semester[key]
        
        for key in cumulativeGrades:
            if key not in cumulativeGrades:
                cumulativeGrades[key] = 0
            cum_total += cumulativeGrades[key]

        avg = cum_total / num_students

        return avg
    