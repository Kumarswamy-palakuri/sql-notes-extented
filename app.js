// SQL Course Notes Application JavaScript

// Course data from provided JSON
const courseData = {
    "sample_database": "-- Sample Database Schema\nCREATE TABLE Students (\n    StudentID INT PRIMARY KEY,\n    FirstName VARCHAR(50),\n    LastName VARCHAR(50),\n    Age INT,\n    Gender CHAR(1)\n);\n\nCREATE TABLE Courses (\n    CourseID INT PRIMARY KEY,\n    CourseName VARCHAR(100),\n    Credits INT\n);\n\nCREATE TABLE Enrollments (\n    EnrollmentID INT PRIMARY KEY,\n    StudentID INT,\n    CourseID INT,\n    EnrollmentDate DATE,\n    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),\n    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)\n);",
    "topics": [
        {"id":"01-intro","title":"Introduction to SQL","description":"SQL (Structured Query Language) lets you create, read, update and delete data in relational databases.","code":"-- No SQL required for this conceptual intro"},
        {"id":"02-create","title":"Creating Tables","description":"Use CREATE TABLE to define new tables with columns and constraints.","code":"-- Creating Students table\nCREATE TABLE Students (\n    StudentID INT PRIMARY KEY,\n    FirstName VARCHAR(50),\n    LastName VARCHAR(50),\n    Age INT,\n    Gender CHAR(1)\n);"},
        {"id":"03-insert","title":"Inserting Data","description":"INSERT INTO adds records into tables.","code":"INSERT INTO Students VALUES (1,'Alice','Sharma',21,'F');"},
        {"id":"04-select","title":"Selecting Data","description":"SELECT retrieves rows and columns from tables.","code":"SELECT * FROM Students;"},
        {"id":"05-update","title":"Updating Data","description":"UPDATE modifies existing rows that match a WHERE clause.","code":"UPDATE Students SET Age = 22 WHERE StudentID = 1;"},
        {"id":"06-delete","title":"Deleting Data","description":"DELETE removes rows that satisfy a WHERE condition.","code":"DELETE FROM Enrollments WHERE EnrollmentID=2;"},
        {"id":"07-where","title":"Filtering Data","description":"WHERE restricts rows returned or affected.","code":"SELECT * FROM Students WHERE Gender='M';"},
        {"id":"08-order","title":"Sorting Data","description":"ORDER BY arranges result rows.","code":"SELECT * FROM Students ORDER BY Age DESC;"},
        {"id":"09-aggregate","title":"Aggregate Functions","description":"COUNT, SUM, AVG compute one value over many rows.","code":"SELECT COUNT(*) AS TotalStudents FROM Students;"},
        {"id":"10-group","title":"Grouping & HAVING","description":"GROUP BY clusters rows for aggregates; HAVING filters groups.","code":"SELECT CourseID, COUNT(*) AS NumEnrolled\n FROM Enrollments\n GROUP BY CourseID HAVING COUNT(*)>0;"},
        {"id":"11-joins","title":"Joins","description":"JOIN combines rows across tables via keys.","code":"SELECT s.FirstName, c.CourseName\n FROM Students s\n JOIN Enrollments e ON s.StudentID=e.StudentID\n JOIN Courses c ON e.CourseID=c.CourseID;"},
        {"id":"12-subqueries","title":"Subqueries","description":"A subquery is an inner SELECT used by an outer query.","code":"SELECT FirstName\n FROM Students\n WHERE StudentID \nIN (SELECT StudentID FROM Enrollments WHERE CourseID=101);"},
        {"id":"13-constraints","title":"Constraints","description":"Constraints enforce data integrity rules.","code":"ALTER TABLE Students ADD CONSTRAINT CHK_Age CHECK (Age>=17);"},
        {"id":"14-views","title":"Views","description":"A view is a stored SELECT statement accessed like a table.","code":"CREATE VIEW StudentEnrollments AS\nSELECT s.FirstName, s.LastName, c.CourseName\nFROM Students s\nJOIN Enrollments e ON s.StudentID = e.StudentID\nJOIN Courses c ON e.CourseID = c.CourseID;"},
        {"id":"15-indexes","title":"Indexes","description":"Indexes speed up lookups on columns.","code":"CREATE INDEX idx_LastName ON Students(LastName);"},
        {"id":"16-transactions","title":"Transactions","description":"Transactions group multiple operations atomically.","code":"START TRANSACTION;\nINSERT INTO Students VALUES (2,'Bob','Wilson',20,'M');\nINSERT INTO Enrollments VALUES (1,2,101,'2024-01-15');\nCOMMIT;"},
        {"id":"17-ctes","title":"Common Table Expressions","description":"CTEs create named temporary result sets.","code":"WITH StudentCounts AS (\n    SELECT StudentID, COUNT(*) AS NumEnrollments\n    FROM Enrollments \n    GROUP BY StudentID\n) \nSELECT * FROM StudentCounts;"},
        {"id":"18-window","title":"Window Functions","description":"Window functions compute values across a row set related to the current row.","code":"SELECT StudentID, \n   ROW_NUMBER() OVER(ORDER BY EnrollmentDate) AS EnrollOrder \nFROM Enrollments;"}
    ]
};

// Extended content for each topic
const extendedContent = {
    "01-intro": {
        content: `<h3>What is SQL?</h3>
        <p>SQL (Structured Query Language) is a domain-specific language used for managing data held in relational database management systems. It was initially developed at IBM in the early 1970s and has since become the standard language for relational databases.</p>
        
        <h3>Key Features of SQL:</h3>
        <ul>
            <li><strong>Declarative:</strong> You specify what you want, not how to get it</li>
            <li><strong>Standardized:</strong> ANSI/ISO standard with wide support</li>
            <li><strong>Portable:</strong> Works across different database systems</li>
            <li><strong>Powerful:</strong> Handles complex data operations efficiently</li>
        </ul>

        <h3>SQL Categories:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- DDL (Data Definition Language)
CREATE, ALTER, DROP, TRUNCATE

-- DML (Data Manipulation Language) 
SELECT, INSERT, UPDATE, DELETE

-- DCL (Data Control Language)
GRANT, REVOKE

-- TCL (Transaction Control Language)
COMMIT, ROLLBACK, SAVEPOINT</code></pre>
        </div>`
    },
    "02-create": {
        content: `<h3>Table Creation Syntax</h3>
        <p>The CREATE TABLE statement defines a new table structure with columns, data types, and constraints. Good table design is crucial for database performance and data integrity.</p>

        <h3>Complete Example:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Create all tables for Student Management system
CREATE TABLE Students (
    StudentID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Age INT CHECK (Age >= 16 AND Age <= 120),
    Gender CHAR(1) CHECK (Gender IN ('M', 'F')),
    Email VARCHAR(100) UNIQUE,
    EnrollmentDate DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE Courses (
    CourseID INT PRIMARY KEY AUTO_INCREMENT,
    CourseName VARCHAR(100) NOT NULL,
    Credits INT CHECK (Credits > 0),
    Department VARCHAR(50),
    Prerequisites TEXT
);

CREATE TABLE Enrollments (
    EnrollmentID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT NOT NULL,
    CourseID INT NOT NULL,
    EnrollmentDate DATE DEFAULT (CURRENT_DATE),
    Grade CHAR(2),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE,
    UNIQUE(StudentID, CourseID)
);</code></pre>
        </div>

        <h3>Common Data Types:</h3>
        <p>Choose appropriate data types based on the expected data:</p>
        <ul>
            <li><strong>INT:</strong> Integer numbers</li>
            <li><strong>VARCHAR(n):</strong> Variable-length strings up to n characters</li>
            <li><strong>CHAR(n):</strong> Fixed-length strings</li>
            <li><strong>DATE:</strong> Date values (YYYY-MM-DD)</li>
            <li><strong>DECIMAL(p,s):</strong> Fixed-point numbers</li>
        </ul>`
    },
    "03-insert": {
        content: `<h3>Inserting Sample Data</h3>
        <p>After creating tables, you need to populate them with data. The INSERT statement has several variations for different scenarios.</p>

        <h3>Multiple Insert Methods:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Insert individual students
INSERT INTO Students (FirstName, LastName, Age, Gender, Email) 
VALUES ('Alice', 'Sharma', 21, 'F', 'alice.sharma@email.com');

INSERT INTO Students (FirstName, LastName, Age, Gender, Email) 
VALUES ('Bob', 'Wilson', 20, 'M', 'bob.wilson@email.com');

-- Insert multiple students at once
INSERT INTO Students (FirstName, LastName, Age, Gender, Email)
 VALUES ('Carol', 'Davis', 22, 'F', 'carol.davis@email.com'),
        ('David', 'Brown', 19, 'M', 'david.brown@email.com'),
        ('Emma', 'Taylor', 21, 'F', 'emma.taylor@email.com');

-- Insert courses
INSERT INTO Courses (CourseName, Credits, Department) VALUES 
('Introduction to Programming', 3, 'Computer Science'),
('Database Systems', 4, 'Computer Science'),
('Calculus I', 4, 'Mathematics'),
('English Composition', 3, 'Liberal Arts');

-- Insert enrollments
INSERT INTO Enrollments (StudentID, CourseID, EnrollmentDate) 
VALUES 
        (1, 101, '2024-01-15'),
        (1, 102, '2024-01-15'),
        (2, 101, '2024-01-16'),
        (3, 103, '2024-01-17');</code></pre>
        </div>`
    },
    "04-select": {
        content: `<h3>SELECT Statement Fundamentals</h3>
        <p>The SELECT statement is the most frequently used SQL command. It retrieves data from one or more tables and can perform calculations, filtering, and sorting.</p>

        <h3>SELECT Variations:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Select specific columns
SELECT FirstName, LastName, Age FROM Students;

-- Select with column aliases
SELECT 
    FirstName AS 'First Name',
    LastName AS 'Last Name',
    Age AS 'Student Age'
FROM Students;

-- Select with calculations
SELECT 
    FirstName,
    LastName,
    Age,
    2024 - Age AS BirthYear
FROM Students;

-- Select with string functions
SELECT 
    CONCAT(FirstName, ' ', LastName) AS FullName,
    UPPER(Email) AS UpperEmail,
    LENGTH(FirstName) AS NameLength
FROM Students;

-- Select distinct values
SELECT DISTINCT Gender FROM Students;
SELECT DISTINCT Department FROM Courses;</code></pre>
        </div>

        <h3>Limiting Results:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Limit number of rows returned
SELECT * FROM Students LIMIT 3;

-- Skip rows and limit (pagination)
SELECT * FROM Students LIMIT 2 OFFSET 3;</code></pre>
        </div>`
    },
    "05-update": {
        content: `<h3>Modifying Existing Data</h3>
        <p>The UPDATE statement modifies existing records in a table. Always use WHERE clauses to avoid updating all rows unintentionally.</p>

        <h3>UPDATE Examples:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Update single record
UPDATE Students 
SET Age = 22 
WHERE StudentID = 1;

-- Update multiple columns
UPDATE Students 
SET Age = 23, Email = 'alice.new@email.com' 
WHERE FirstName = 'Alice' AND LastName = 'Sharma';

-- Update with calculations
UPDATE Students 
SET Age = Age + 1 
WHERE StudentID IN (1, 2, 3);

-- Update based on another table
UPDATE Enrollments e
SET Grade = 'A'
WHERE e.StudentID IN (
    SELECT StudentID FROM Students 
    WHERE Age >= 21
);

-- Conditional updates with CASE
UPDATE Students 
SET Age = CASE 
    WHEN Age < 18 THEN 18
    WHEN Age > 65 THEN 65
    ELSE Age
END;</code></pre>
        </div>

        <h3>Best Practices:</h3>
        <ul>
            <li>Always use WHERE clause to target specific rows</li>
            <li>Test with SELECT first before UPDATE</li>
            <li>Consider using transactions for complex updates</li>
            <li>Back up data before large updates</li>
        </ul>`
    },
    "06-delete": {
        content: `<h3>Removing Data from Tables</h3>
        <p>The DELETE statement removes rows from a table. Like UPDATE, it should almost always include a WHERE clause to target specific rows.</p>

        <h3>DELETE Examples:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Delete specific enrollment
DELETE FROM Enrollments WHERE EnrollmentID = 2;

-- Delete based on conditions
DELETE FROM Students WHERE Age < 18;

-- Delete based on subquery
DELETE FROM Enrollments 
WHERE StudentID IN (
    SELECT StudentID FROM Students 
    WHERE FirstName = 'Bob'
);

-- Delete with JOIN (MySQL syntax)
DELETE e FROM Enrollments e
INNER JOIN Students s ON e.StudentID = s.StudentID
WHERE s.Age < 18;

-- Delete duplicate records (keep one)
DELETE e1 FROM Enrollments e1
INNER JOIN Enrollments e2 
WHERE e1.EnrollmentID > e2.EnrollmentID 
AND e1.StudentID = e2.StudentID 
AND e1.CourseID = e2.CourseID;</code></pre>
        </div>

        <h3>Alternative: TRUNCATE</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Remove all rows quickly (cannot be undone)
TRUNCATE TABLE Enrollments;</code></pre>
        </div>

        <h3>Safety Tips:</h3>
        <ul>
            <li>Test DELETE with SELECT first</li>
            <li>Use transactions for important operations</li>
            <li>Be careful with foreign key constraints</li>
            <li>TRUNCATE is faster but cannot be rolled back</li>
        </ul>`
    },
    "07-where": {
        content: `<h3>Advanced Filtering Techniques</h3>
        <p>The WHERE clause is essential for filtering data. It supports various operators and conditions to precisely target the data you need.</p>

        <h3>Comparison Operators:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Equality and inequality
SELECT * FROM Students WHERE Age = 21;
SELECT * FROM Students WHERE Age != 20;
SELECT * FROM Students WHERE Age <> 20; -- Same as !=

-- Numeric comparisons
SELECT * FROM Students WHERE Age > 20;
SELECT * FROM Students WHERE Age <= 22;
SELECT * FROM Courses WHERE Credits >= 3;

-- Range conditions
SELECT * FROM Students WHERE Age BETWEEN 19 AND 22;
SELECT * FROM Students WHERE Age NOT BETWEEN 18 AND 25;</code></pre>
        </div>

        <h3>Pattern Matching:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- LIKE with wildcards
SELECT * FROM Students WHERE FirstName LIKE 'A%';\n-- Starts with A
SELECT * FROM Students WHERE LastName LIKE '%son';\n-- Ends with son
SELECT * FROM Students WHERE Email LIKE '%@gmail.%';\n-- Contains @gmail.
SELECT * FROM Students WHERE FirstName LIKE '_lice';\n-- Second char is 'l'

-- Case-insensitive search
SELECT * FROM Students WHERE LOWER(FirstName) LIKE 'alice';</code></pre>
        </div>

        <h3>Logical Operators:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- AND operator
SELECT * FROM Students 
WHERE Age > 20 AND Gender = 'F';

-- OR operator  
SELECT * FROM Students 
WHERE Age < 19 OR Age > 23;

-- NOT operator
SELECT * FROM Students 
WHERE NOT Gender = 'M';

-- Complex conditions with parentheses
SELECT * FROM Students 
WHERE (Age BETWEEN 19 AND 22)\n AND\n (Gender = 'F' OR FirstName LIKE 'A%');</code></pre>
        </div>

        <h3>NULL Handling:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Check for NULL values
SELECT * FROM Students WHERE Email IS NULL;
SELECT * FROM Students WHERE Email IS NOT NULL;

-- NULL-safe comparisons
SELECT * FROM Enrollments WHERE Grade IS NULL;</code></pre>
        </div>`
    },
    "08-order": {
        content: `<h3>Sorting and Organizing Results</h3>
        <p>ORDER BY controls the sequence of rows in your result set. You can sort by single or multiple columns, and control ascending or descending order.</p>

        <h3>Basic Sorting:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Single column sorts
SELECT * FROM Students ORDER BY LastName;
SELECT * FROM Students ORDER BY Age DESC;
SELECT * FROM Students ORDER BY FirstName ASC; 
-- ASC is default

-- Multiple column sorts
SELECT * FROM Students ORDER BY Gender, Age DESC;
SELECT * FROM Students ORDER BY LastName, FirstName;</code></pre>
        </div>

        <h3>Advanced Sorting:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Sort by calculated columns
SELECT FirstName, LastName, Age, (2024 - Age) AS BirthYear
FROM Students 
ORDER BY BirthYear;

-- Sort by column position
SELECT FirstName, LastName, Age FROM Students 
ORDER BY 3 DESC; 
-- Sort by Age

-- Conditional sorting with CASE
SELECT FirstName, LastName, Age, Gender
FROM Students 
ORDER BY 
    CASE Gender 
        WHEN 'F' THEN 1 
        WHEN 'M' THEN 2 
        ELSE 3 
    END,
    Age;

-- Sort with NULL values
SELECT * FROM Enrollments ORDER BY Grade DESC; 
-- NULLs typically appear last</code></pre>
        </div>

        <h3>Sorting with Joins:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Sort joined data
SELECT s.FirstName, s.LastName, c.CourseName
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
JOIN Courses c ON e.CourseID = c.CourseID
ORDER BY s.LastName, c.CourseName;</code></pre>
        </div>`
    },
    "09-aggregate": {
        content: `<h3>Aggregate Functions Overview</h3>
        <p>Aggregate functions perform calculations on multiple rows and return a single result. They are essential for data analysis and reporting.</p>

        <h3>Common Aggregate Functions:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Basic aggregate functions
SELECT COUNT(*) AS TotalStudents FROM Students;
SELECT COUNT(Email) AS StudentsWithEmail FROM Students;
SELECT COUNT(DISTINCT Gender) AS UniqueGenders FROM Students;

-- Numeric aggregates
SELECT 
    COUNT(*) AS TotalCourses,
    SUM(Credits) AS TotalCredits,
    AVG(Credits) AS AverageCredits,
    MIN(Credits) AS MinCredits,
    MAX(Credits) AS MaxCredits
FROM Courses;

-- String aggregates (MySQL)
SELECT GROUP_CONCAT(FirstName) AS AllFirstNames FROM Students;</code></pre>
        </div>

        <h3>Aggregate with Conditions:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Conditional aggregates
SELECT 
  COUNT(*) AS TotalStudents,
  COUNT(CASE WHEN Gender = 'F' THEN 1 END) AS FemaleStudents,
  COUNT(CASE WHEN Gender = 'M' THEN 1 END) AS MaleStudents,
  COUNT(CASE WHEN Age >= 21 THEN 1 END) AS AdultStudents
FROM Students;

-- Aggregates with WHERE
SELECT COUNT(*) AS YoungStudents 
FROM Students 
WHERE Age < 21;</code></pre>
        </div>

        <h3>Mathematical Operations:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Statistical functions
SELECT 
    AVG(Age) AS AverageAge,
    ROUND(AVG(Age), 2) AS RoundedAverage,
    VARIANCE(Age) AS AgeVariance,
    STDDEV(Age) AS AgeStdDev
FROM Students;</code></pre>
        </div>`
    },
    "10-group": {
        content: `<h3>Grouping Data for Analysis</h3>
        <p>GROUP BY creates subsets of data for aggregate calculations. HAVING filters groups after aggregation, while WHERE filters individual rows before grouping.</p>

        <h3>Basic Grouping:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Group by single column
SELECT Gender, COUNT(*) AS Count
FROM Students
GROUP BY Gender;

-- Group by multiple columns
SELECT Gender, 
       CASE WHEN Age < 21 
       THEN 'Young' 
       ELSE 'Adult' END AS AgeGroup,
       COUNT(*) AS Count
FROM Students
GROUP BY Gender, 
  CASE 
  WHEN Age < 21 THEN 'Young' ELSE 'Adult' END;</code></pre>
        </div>

        <h3>HAVING Clause:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Filter groups with HAVING
SELECT CourseID, COUNT(*) AS NumEnrolled
FROM Enrollments 
GROUP BY CourseID
HAVING COUNT(*) > 1;

-- Complex HAVING conditions
SELECT Gender, AVG(Age) AS AvgAge
FROM Students
GROUP BY Gender
HAVING AVG(Age) > 20;</code></pre>
        </div>

        <h3>Advanced Grouping:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Grouping with joins
SELECT c.Department, COUNT(*) AS TotalEnrollments
FROM Courses c
JOIN Enrollments e ON c.CourseID = e.CourseID
GROUP BY c.Department
ORDER BY TotalEnrollments DESC;

-- Multiple aggregates per group
SELECT 
    c.Department,
    COUNT(DISTINCT c.CourseID) AS NumberOfCourses,
    COUNT(e.EnrollmentID) AS TotalEnrollments,
    AVG(c.Credits) AS AvgCredits
FROM Courses c
LEFT JOIN Enrollments e ON c.CourseID = e.CourseID
GROUP BY c.Department;</code></pre>
        </div>

        <h3>GROUP BY with ROLLUP:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Create subtotals and grand totals
SELECT Gender, COUNT(*) AS Count
FROM Students
GROUP BY Gender WITH ROLLUP;</code></pre>
        </div>`
    },
    "11-joins": {
        content: `<h3>Combining Data from Multiple Tables</h3>
        <p>Joins are fundamental to relational databases, allowing you to combine related data from different tables based on common columns.</p>

        <h3>INNER JOIN:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Basic inner join
SELECT s.FirstName, s.LastName, c.CourseName
FROM Students s
INNER JOIN Enrollments e ON s.StudentID = e.StudentID
INNER JOIN Courses c ON e.CourseID = c.CourseID;

-- Three-table join with conditions
SELECT s.FirstName, s.LastName, c.CourseName, c.Credits
FROM Students s
INNER JOIN Enrollments e ON s.StudentID = e.StudentID
INNER JOIN Courses c ON e.CourseID = c.CourseID
WHERE c.Credits >= 3;</code></pre>
        </div>

        <h3>LEFT JOIN:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Include all students, even those not enrolled
SELECT s.FirstName, s.LastName, c.CourseName
FROM Students s
LEFT JOIN Enrollments e ON s.StudentID = e.StudentID
LEFT JOIN Courses c ON e.CourseID = c.CourseID;

-- Find students with no enrollments
SELECT s.FirstName, s.LastName
FROM Students s
LEFT JOIN Enrollments e ON s.StudentID = e.StudentID
WHERE e.StudentID IS NULL;</code></pre>
        </div>

        <h3>RIGHT JOIN and FULL OUTER JOIN:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Right join (less commonly used)
SELECT s.FirstName, s.LastName, c.CourseName
FROM Students s
RIGHT JOIN Enrollments e ON s.StudentID = e.StudentID
RIGHT JOIN Courses c ON e.CourseID = c.CourseID;

-- Full outer join (MySQL doesn't support, use UNION)
SELECT s.FirstName, s.LastName, c.CourseName
FROM Students s
LEFT JOIN Enrollments e ON s.StudentID = e.StudentID
LEFT JOIN Courses c ON e.CourseID = c.CourseID
UNION
SELECT s.FirstName, s.LastName, c.CourseName
FROM Students s
RIGHT JOIN Enrollments e ON s.StudentID = e.StudentID
RIGHT JOIN Courses c ON e.CourseID = c.CourseID;</code></pre>
        </div>

        <h3>Self JOIN:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Find students in the same courses
SELECT 
    s1.FirstName AS Student1,
    s2.FirstName AS Student2,
    c.CourseName
FROM Students s1
JOIN Enrollments e1 ON s1.StudentID = e1.StudentID
JOIN Enrollments e2 ON e1.CourseID = e2.CourseID
JOIN Students s2 ON e2.StudentID = s2.StudentID
JOIN Courses c ON e1.CourseID = c.CourseID
WHERE s1.StudentID < s2.StudentID;</code></pre>
        </div>`
    },
    "12-subqueries": {
        content: `<h3>Nested Queries for Complex Logic</h3>
        <p>Subqueries (nested queries) allow you to use the result of one query within another query. They're powerful tools for complex filtering and calculations.</p>

        <h3>Subqueries in WHERE Clause:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Find students enrolled in specific courses
SELECT FirstName, LastName FROM Students 
WHERE StudentID IN (
    SELECT StudentID FROM Enrollments 
    WHERE CourseID = 101
);

-- Find students older than average
SELECT FirstName, LastName, Age FROM Students 
WHERE Age > (SELECT AVG(Age) FROM Students);

-- Find courses with no enrollments
SELECT CourseName FROM Courses
WHERE CourseID NOT IN (
    SELECT DISTINCT CourseID FROM Enrollments 
    WHERE CourseID IS NOT NULL
);</code></pre>
        </div>

        <h3>Correlated Subqueries:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Find students with above-average age for their gender
SELECT FirstName, LastName, Age, Gender
FROM Students s1
WHERE Age > (
    SELECT AVG(Age) 
    FROM Students s2 
    WHERE s2.Gender = s1.Gender
);

-- Find students enrolled in multiple courses
SELECT FirstName, LastName
FROM Students s
WHERE (
    SELECT COUNT(*) 
    FROM Enrollments e 
    WHERE e.StudentID = s.StudentID
) > 1;</code></pre>
        </div>

        <h3>EXISTS and NOT EXISTS:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Find students who are enrolled in courses
SELECT FirstName, LastName
FROM Students s
WHERE EXISTS (
    SELECT 1 FROM Enrollments e 
    WHERE e.StudentID = s.StudentID
);

-- Find courses with no enrollments
SELECT CourseName
FROM Courses c
WHERE NOT EXISTS (
    SELECT 1 FROM Enrollments e 
    WHERE e.CourseID = c.CourseID
);</code></pre>
        </div>

        <h3>Subqueries in SELECT:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Add calculated columns using subqueries
SELECT 
    FirstName,
    LastName,
    (SELECT COUNT(*) 
     FROM Enrollments e 
     WHERE e.StudentID = s.StudentID) AS EnrollmentCount
FROM Students s;</code></pre>
        </div>`
    },
    "13-constraints": {
        content: `<h3>Ensuring Data Integrity</h3>
        <p>Constraints are rules that enforce data integrity at the database level. They prevent invalid data from being inserted or updated.</p>

        <h3>Primary Key Constraints:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Primary key ensures unique identification
CREATE TABLE Students (
    StudentID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL
);

-- Composite primary key
CREATE TABLE Enrollments (
    StudentID INT,
    CourseID INT,
    EnrollmentDate DATE,
    PRIMARY KEY (StudentID, CourseID)
);</code></pre>
        </div>

        <h3>Foreign Key Constraints:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Foreign key maintains referential integrity
ALTER TABLE Enrollments 
ADD CONSTRAINT FK_Student 
FOREIGN KEY (StudentID) REFERENCES Students(StudentID);

-- Foreign key with cascade options
ALTER TABLE Enrollments 
ADD CONSTRAINT FK_Course 
FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
ON DELETE CASCADE
ON UPDATE CASCADE;</code></pre>
        </div>

        <h3>Check Constraints:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Validate data ranges and values
ALTER TABLE Students 
ADD CONSTRAINT CHK_Age CHECK (Age >= 16 AND Age <= 120);

ALTER TABLE Students 
ADD CONSTRAINT CHK_Gender CHECK (Gender IN ('M', 'F'));

-- Complex check constraints
ALTER TABLE Courses 
ADD CONSTRAINT CHK_Credits \nCHECK (Credits > 0 AND Credits <= 6);</code></pre>
        </div>

        <h3>Unique Constraints:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Ensure column values are unique
ALTER TABLE Students 
ADD CONSTRAINT UK_Email UNIQUE (Email);

-- Composite unique constraint
ALTER TABLE Enrollments 
ADD CONSTRAINT UK_Student_Course UNIQUE (StudentID, CourseID);</code></pre>
        </div>

        <h3>NOT NULL Constraints:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Ensure required fields are filled
ALTER TABLE Students 
MODIFY COLUMN FirstName VARCHAR(50) NOT NULL;

ALTER TABLE Students 
MODIFY COLUMN LastName VARCHAR(50) NOT NULL;</code></pre>
        </div>`
    },
    "14-views": {
        content: `<h3>Creating Virtual Tables</h3>
        <p>Views are virtual tables created by storing SELECT queries. They provide a way to simplify complex queries, enhance security, and create abstraction layers.</p>

        <h3>Basic View Creation:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Simple view for student information
CREATE VIEW StudentInfo AS
SELECT 
    StudentID,
    CONCAT(FirstName, ' ', LastName) AS FullName,
    Age,
    Gender,
    Email
FROM Students;

-- Use the view like a table
SELECT * FROM StudentInfo WHERE Age > 20;</code></pre>
        </div>

        <h3>Complex Views with Joins:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- View combining multiple tables
CREATE VIEW StudentEnrollments AS
SELECT 
    s.StudentID,
    s.FirstName,
    s.LastName,
    c.CourseID,
    c.CourseName,
    c.Credits,
    e.EnrollmentDate,
    e.Grade
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
JOIN Courses c ON e.CourseID = c.CourseID;

-- Query the complex view
SELECT FullName, CourseName, Credits
FROM (
    SELECT CONCAT(FirstName, ' ', LastName) AS FullName,
           CourseName, Credits
    FROM StudentEnrollments
) AS DetailedView
WHERE Credits >= 4;</code></pre>
        </div>

        <h3>Aggregate Views:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- View with aggregated data
CREATE VIEW DepartmentStats AS
SELECT 
    c.Department,
    COUNT(DISTINCT c.CourseID) AS TotalCourses,
    COUNT(e.EnrollmentID) AS TotalEnrollments,
    AVG(c.Credits) AS AvgCredits
FROM Courses c
LEFT JOIN Enrollments e ON c.CourseID = e.CourseID
GROUP BY c.Department;

-- Student enrollment summary
CREATE VIEW StudentSummary AS
SELECT 
    s.StudentID,
    s.FirstName,
    s.LastName,
    COUNT(e.CourseID) AS CoursesEnrolled,
    SUM(c.Credits) AS TotalCredits
FROM Students s
LEFT JOIN Enrollments e ON s.StudentID = e.StudentID
LEFT JOIN Courses c ON e.CourseID = c.CourseID
GROUP BY s.StudentID, s.FirstName, s.LastName;</code></pre>
        </div>

        <h3>View Management:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Update view definition
CREATE OR REPLACE VIEW StudentInfo AS
SELECT 
    StudentID,
    CONCAT(FirstName, ' ', LastName) AS FullName,
    Age,
    Gender,
    Email,
    YEAR(CURDATE()) - Age AS BirthYear
FROM Students;

-- Drop view
DROP VIEW IF EXISTS StudentInfo;</code></pre>
        </div>`
    },
    "15-indexes": {
        content: `<h3>Optimizing Query Performance</h3>
        <p>Indexes are data structures that improve query performance by creating shortcuts to data. They speed up SELECT operations but can slow down INSERT, UPDATE, and DELETE operations.</p>

        <h3>Creating Basic Indexes:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Single column indexes
CREATE INDEX idx_student_lastname ON Students(LastName);
CREATE INDEX idx_student_age ON Students(Age);
CREATE INDEX idx_enrollment_date ON 
    Enrollments(EnrollmentDate);

-- Unique index (alternative to UNIQUE constraint)
CREATE UNIQUE INDEX idx_student_email ON Students(Email);</code></pre>
        </div>

        <h3>Composite Indexes:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Multi-column indexes (order matters!)
CREATE INDEX idx_student_name ON 
Students(LastName, FirstName);
CREATE INDEX idx_enrollment_student_course ON 
Enrollments(StudentID, CourseID);

-- Index for common WHERE conditions
CREATE INDEX idx_student_age_gender ON Students(Age, Gender);</code></pre>
        </div>

        <h3>Analyzing Index Usage:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Check query execution plan
EXPLAIN SELECT * FROM Students WHERE LastName = 'Smith';

-- Analyze index effectiveness
EXPLAIN SELECT s.FirstName, c.CourseName
FROM Students s
JOIN Enrollments e ON s.StudentID = e.StudentID
JOIN Courses c ON e.CourseID = c.CourseID
WHERE s.Age > 20;</code></pre>
        </div>

        <h3>Index Management:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- View existing indexes
SHOW INDEXES FROM Students;

-- Drop indexes when no longer needed
DROP INDEX idx_student_age ON Students;

-- Optimize table and rebuild indexes
OPTIMIZE TABLE Students;</code></pre>
        </div>

        <h3>Index Best Practices:</h3>
        <ul>
            <li>Index columns frequently used in WHERE clauses</li>
            <li>Index foreign key columns for better JOIN performance</li>
            <li>Consider composite indexes for multi-column searches</li>
            <li>Don't over-index - each index has maintenance overhead</li>
            <li>Monitor and analyze query performance regularly</li>
        </ul>`
    },
    "16-transactions": {
        content: `<h3>Ensuring Data Consistency</h3>
        <p>Transactions group multiple SQL operations into a single unit of work that either succeeds completely or fails completely, maintaining database consistency.</p>

        <h3>Basic Transaction Control:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Basic transaction structure
START TRANSACTION;

INSERT INTO Students (FirstName, LastName, Age, Gender, Email)
VALUES ('John', 'Smith', 22, 'M', 'john.smith@email.com');

INSERT INTO Enrollments (StudentID, CourseID, EnrollmentDate)
VALUES (LAST_INSERT_ID(), 101, CURDATE());

COMMIT; -- Make changes permanent</code></pre>
        </div>

        <h3>Transaction with Rollback:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Transaction with error handling
START TRANSACTION;

-- Insert new student
INSERT INTO Students (FirstName, LastName, Age, Gender, Email)
VALUES ('Jane', 'Doe', 20, 'F', 'jane.doe@email.com');

SET @student_id = LAST_INSERT_ID();

-- Try to enroll in course
INSERT INTO Enrollments (StudentID, CourseID, EnrollmentDate)
VALUES (@student_id, 999, CURDATE());
-- Course might not exist

-- Check if course exists
IF (SELECT COUNT(*) FROM Courses WHERE CourseID = 999) = 0 
THEN
    ROLLBACK; -- Undo all changes
    SELECT 'Transaction rolled back: Course does not exist'
    AS Message;
ELSE
    COMMIT; -- Confirm all changes
    SELECT 'Student enrolled successfully' AS Message;
END IF;</code></pre>
        </div>

        <h3>Savepoints:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Using savepoints for partial rollbacks
START TRANSACTION;

-- Insert first student
INSERT INTO Students (FirstName, LastName, Age, Gender)
VALUES ('Alice', 'Brown', 21, 'F');

SAVEPOINT sp1;

-- Insert second student
INSERT INTO Students (FirstName, LastName, Age, Gender)
VALUES ('Bob', 'Green', 19, 'M');

SAVEPOINT sp2;

-- Something goes wrong, rollback to sp1
ROLLBACK TO SAVEPOINT sp1;

-- Continue with transaction
INSERT INTO Students (FirstName, LastName, Age, Gender)
VALUES ('Carol', 'White', 22, 'F');

COMMIT;</code></pre>
        </div>

        <h3>Transaction Isolation Levels:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Set transaction isolation level
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Example of isolation level usage
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
SELECT COUNT(*) FROM Students;
-- Other transactions can modify data
SELECT COUNT(*) FROM Students; 
-- Might return different result
COMMIT;</code></pre>
        </div>

        <h3>ACID Properties:</h3>
        <ul>
            <li><strong>Atomicity:</strong> All operations succeed or fail together</li>
            <li><strong>Consistency:</strong> Database remains in valid state</li>
            <li><strong>Isolation:</strong> Concurrent transactions don't interfere</li>
            <li><strong>Durability:</strong> Committed changes persist</li>
        </ul>`
    },
    "17-ctes": {
        content: `<h3>Simplifying Complex Queries</h3>
        <p>Common Table Expressions (CTEs) create temporary named result sets that exist only during query execution. They make complex queries more readable and maintainable.</p>

        <h3>Basic CTE Syntax:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Simple CTE example
WITH StudentCounts AS (
    SELECT StudentID, COUNT(*) AS NumEnrollments
    FROM Enrollments 
    GROUP BY StudentID
)
SELECT s.FirstName, s.LastName, sc.NumEnrollments
FROM Students s
JOIN StudentCounts sc ON s.StudentID = sc.StudentID
WHERE sc.NumEnrollments > 1;</code></pre>
        </div>

        <h3>Multiple CTEs:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Multiple CTEs in single query
WITH 
StudentStats AS (
    SELECT 
        StudentID,
        COUNT(*) AS CourseCount,
        AVG(c.Credits) AS AvgCredits
    FROM Enrollments e
    JOIN Courses c ON e.CourseID = c.CourseID
    GROUP BY StudentID
),
DepartmentStats AS (
    SELECT 
        c.Department,
        COUNT(*) AS TotalEnrollments
    FROM Courses c
    JOIN Enrollments e ON c.CourseID = e.CourseID
    GROUP BY c.Department
)
SELECT 
    s.FirstName,
    s.LastName,
    ss.CourseCount,
    ss.AvgCredits,
    ds.Department
FROM Students s
JOIN StudentStats ss ON s.StudentID = ss.StudentID
JOIN Enrollments e ON s.StudentID = e.StudentID
JOIN Courses c ON e.CourseID = c.CourseID
JOIN DepartmentStats ds ON c.Department = ds.Department;</code></pre>
        </div>

        <h3>Recursive CTEs:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Recursive CTE for hierarchical data
-- First, create a prerequisite structure
ALTER TABLE Courses ADD COLUMN PrerequisiteCourseID INT;

WITH RECURSIVE CourseHierarchy AS (
    -- Base case: courses with no prerequisites
    SELECT 
        CourseID,
        CourseName,
        PrerequisiteCourseID,
        0 as Level,
        CAST(CourseName AS CHAR(255)) as Path
    FROM Courses
    WHERE PrerequisiteCourseID IS NULL
    
    UNION ALL
    
    -- Recursive case: courses with prerequisites
    SELECT 
        c.CourseID,
        c.CourseName,
        c.PrerequisiteCourseID,
        ch.Level + 1,
        CONCAT(ch.Path, ' -> ', c.CourseName)
    FROM Courses c
    JOIN CourseHierarchy ch 
        ON c.PrerequisiteCourseID = ch.CourseID
)
SELECT CourseID, CourseName, Level, Path
FROM CourseHierarchy
ORDER BY Level, CourseName;</code></pre>
        </div>

        <h3>CTE for Data Analysis:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Complex analysis with CTE
WITH MonthlyEnrollments AS (
    SELECT 
        YEAR(EnrollmentDate) as EnrollYear,
        MONTH(EnrollmentDate) as EnrollMonth,
        COUNT(*) as MonthlyCount
    FROM Enrollments
    GROUP BY YEAR(EnrollmentDate), MONTH(EnrollmentDate)
),
EnrollmentTrends AS (
    SELECT 
        EnrollYear,
        EnrollMonth,
        MonthlyCount,
        LAG(MonthlyCount) 
        OVER (ORDER BY EnrollYear, EnrollMonth) 
           as PrevMonthCount
    FROM MonthlyEnrollments
)
SELECT 
    EnrollYear,
    EnrollMonth,
    MonthlyCount,
    CASE 
        WHEN PrevMonthCount IS NULL THEN NULL
        ELSE ROUND
((MonthlyCount - PrevMonthCount) * 100.0 / PrevMonthCount, 2)
    END as GrowthPercent
FROM EnrollmentTrends
ORDER BY EnrollYear, EnrollMonth;</code></pre>
        </div>`
    },
    "18-window": {
        content: `<h3>Advanced Analytical Functions</h3>
        <p>Window functions perform calculations across related rows without grouping them. They provide powerful analytical capabilities while maintaining row-level detail.</p>

        <h3>Ranking Functions:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Ranking students by age
SELECT 
    FirstName,
    LastName,
    Age,
    ROW_NUMBER() OVER (ORDER BY Age DESC) as RowNum,
    RANK() OVER (ORDER BY Age DESC) as Rank,
    DENSE_RANK() OVER (ORDER BY Age DESC) as DenseRank
FROM Students;

-- Ranking within partitions
SELECT 
    s.FirstName,
    s.LastName,
    s.Gender,
    s.Age,
    ROW_NUMBER() OVER (PARTITION BY s.Gender 
    ORDER BY s.Age DESC) as RankInGender
FROM Students s;</code></pre>
        </div>

        <h3>Aggregate Window Functions:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Running totals and moving averages
SELECT 
    e.EnrollmentDate,
    COUNT(*) as DailyEnrollments,
    SUM(COUNT(*)) OVER (ORDER BY e.EnrollmentDate) 
        as RunningTotal,
    AVG(COUNT(*)) OVER (
        ORDER BY e.EnrollmentDate 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as ThreeDayAvg
FROM Enrollments e
GROUP BY e.EnrollmentDate
ORDER BY e.EnrollmentDate;</code></pre>
        </div>

        <h3>LAG and LEAD Functions:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Compare current row with previous/next rows
SELECT 
    StudentID,
    CourseID,
    EnrollmentDate,
    LAG(EnrollmentDate) OVER (
        PARTITION BY StudentID 
        ORDER BY EnrollmentDate
    ) as PrevEnrollmentDate,
    LEAD(EnrollmentDate) OVER (
        PARTITION BY StudentID 
        ORDER BY EnrollmentDate
    ) as NextEnrollmentDate
FROM Enrollments
ORDER BY StudentID, EnrollmentDate;</code></pre>
        </div>

        <h3>FIRST_VALUE and LAST_VALUE:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Get first and last values in window
SELECT 
    s.FirstName,
    s.LastName,
    s.Age,
    FIRST_VALUE(s.Age) OVER (ORDER BY s.Age) as YoungestAge,
    LAST_VALUE(s.Age) OVER (
        ORDER BY s.Age 
        RANGE BETWEEN 
            UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as OldestAge
FROM Students s;</code></pre>
        </div>

        <h3>NTILE for Quartiles:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Divide data into quartiles
SELECT 
    FirstName,
    LastName,
    Age,
    NTILE(4) OVER (ORDER BY Age) as AgeQuartile,
    CASE NTILE(4) OVER (ORDER BY Age)
        WHEN 1 THEN 'Q1 (Youngest)'
        WHEN 2 THEN 'Q2 (Young)'
        WHEN 3 THEN 'Q3 (Older)'
        WHEN 4 THEN 'Q4 (Oldest)'
    END as QuartileLabel
FROM Students
ORDER BY Age;</code></pre>
        </div>

        <h3>Window Frame Specifications:</h3>
        <div class="code-block">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-sql">-- Different window frame examples
SELECT 
    EnrollmentDate,
    COUNT(*) as DailyCount,
    -- Unbounded preceding to current row
    SUM(COUNT(*)) OVER (
        ORDER BY EnrollmentDate 
        ROWS UNBOUNDED PRECEDING
    ) as CumulativeTotal,
    -- Moving 7-day window
    AVG(COUNT(*)) OVER (
        ORDER BY EnrollmentDate 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as SevenDayAvg,
    -- Range-based window (all equal values)
    COUNT(*) OVER (
        ORDER BY EnrollmentDate 
        RANGE BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
    ) as FutureCount
FROM Enrollments
GROUP BY EnrollmentDate
ORDER BY EnrollmentDate;</code></pre>
        </div>`
    }
};

// Application state
let currentTheme = 'light';
let sidebarOpen = false;
let searchTerm = '';
let allSectionsLoaded = false;

// DOM Elements
const elements = {
    themeToggle: null,
    menuToggle: null,
    sidebar: null,
    overlay: null,
    searchInput: null,
    searchClear: null,
    backToTop: null,
    navLinks: null,
    contentWrapper: null,
    mainContent: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    loadAllContent();
    initializeTheme();
    setupEventListeners();
    initializeSyntaxHighlighting();
    setupScrollSpy();
    
    // Set sample database as active initially
    setTimeout(() => {
        updateActiveNavItem('sample-database');
    }, 100);
});

// Initialize DOM elements
function initializeElements() {
    elements.themeToggle = document.getElementById('themeToggle');
    elements.menuToggle = document.getElementById('menuToggle');
    elements.sidebar = document.getElementById('sidebar');
    elements.overlay = document.getElementById('overlay');
    elements.searchInput = document.getElementById('searchInput');
    elements.searchClear = document.getElementById('searchClear');
    elements.backToTop = document.getElementById('backToTop');
    elements.contentWrapper = document.querySelector('.content-wrapper');
    elements.mainContent = document.getElementById('mainContent');
}

// Load all course content dynamically
function loadAllContent() {
    if (allSectionsLoaded) return;
    
    // Create sections for all topics
    courseData.topics.forEach((topic, index) => {
        const sectionElement = createTopicSection(topic, index + 1);
        elements.contentWrapper.appendChild(sectionElement);
    });
    
    // Add copy buttons and syntax highlighting after a brief delay
    setTimeout(() => {
        addCopyButtons();
        initializeSyntaxHighlighting();
        allSectionsLoaded = true;
    }, 200);
    
    // Refresh navigation links
    elements.navLinks = document.querySelectorAll('.nav-link');
}

// Create HTML element for a topic section
function createTopicSection(topic, topicNumber) {
    const sectionDiv = document.createElement('section');
    sectionDiv.id = topic.id;
    sectionDiv.className = 'content-section';
    
    const extended = extendedContent[topic.id] || { content: '<p>Additional content coming soon...</p>' };
    
    sectionDiv.innerHTML = `
        <h2>${topicNumber}. ${topic.title}</h2>
        <div class="section-content">
            <div class="topic-description">
                <p>${topic.description}</p>
            </div>
            
            <h3>Example Code:</h3>
            <div class="code-block">
                <button class="copy-btn">Copy</button>
                <pre><code class="language-sql">${escapeHtml(topic.code)}</code></pre>
            </div>
            
            <div class="original-content">
                ${extended.content}
            </div>
        </div>
    `;
    
    return sectionDiv;
}

// Escape HTML characters
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add copy buttons to code blocks
function addCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const codeBlock = this.nextElementSibling.querySelector('code');
            const text = codeBlock.textContent;
            
            // Use the Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showCopySuccess(this);
                }).catch(() => {
                    fallbackCopyTextToClipboard(text, this);
                });
            } else {
                fallbackCopyTextToClipboard(text, this);
            }
        });
    });
}

// Show copy success feedback
function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
    }, 2000);
}

// Fallback copy method
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            console.error('Copy command was unsuccessful');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Initialize theme system
function initializeTheme() {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = prefersDark ? 'dark' : 'light';
    applyTheme(currentTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        currentTheme = e.matches ? 'dark' : 'light';
        applyTheme(currentTheme);
    });
}

// Apply theme
function applyTheme(theme) {
    currentTheme = theme;
    
    // Set the data attribute on document root
    document.documentElement.setAttribute('data-color-scheme', theme);
    
    // Update theme toggle icon
    if (elements.themeToggle) {
        const themeIcon = elements.themeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Mobile menu toggle
    if (elements.menuToggle) {
        elements.menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
        });
    }

    // Overlay click
    if (elements.overlay) {
        elements.overlay.addEventListener('click', function() {
            closeSidebar();
        });
    }

    // Setup navigation after content is loaded
    setTimeout(setupNavigationListeners, 300);

    // Search functionality
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', function() {
            searchTerm = this.value.toLowerCase().trim();
            performSearch();
            updateSearchClearButton();
        });
    }

    if (elements.searchClear) {
        elements.searchClear.addEventListener('click', function() {
            elements.searchInput.value = '';
            searchTerm = '';
            clearSearch();
            updateSearchClearButton();
            elements.searchInput.focus();
        });
    }

    // Back to top button
    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Window scroll event
    window.addEventListener('scroll', handleScroll);

    // Window resize event
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });

    // Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebarOpen) {
            closeSidebar();
        }
    });
}

// Setup navigation listeners after content is loaded
function setupNavigationListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                updateActiveNavItem(targetId);
                
                const headerHeight = 64;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                if (window.innerWidth <= 768) {
                    setTimeout(closeSidebar, 300);
                }
            }
        });
    });
}

// Toggle sidebar
function toggleSidebar() {
    if (sidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

// Open sidebar
function openSidebar() {
    sidebarOpen = true;
    if (elements.sidebar) {
        elements.sidebar.classList.add('open');
    }
    if (elements.overlay) {
        elements.overlay.classList.add('visible');
    }
    document.body.style.overflow = 'hidden';
}

// Close sidebar
function closeSidebar() {
    sidebarOpen = false;
    if (elements.sidebar) {
        elements.sidebar.classList.remove('open');
    }
    if (elements.overlay) {
        elements.overlay.classList.remove('visible');
    }
    document.body.style.overflow = '';
}

// Update active navigation item
function updateActiveNavItem(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeId) {
            link.classList.add('active');
        }
    });
}

// Perform search
function performSearch() {
    if (!searchTerm) {
        clearSearch();
        return;
    }

    const sections = document.querySelectorAll('.content-section');
    let hasVisibleSections = false;

    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        const title = section.querySelector('h1, h2').textContent.toLowerCase();
        
        if (content.includes(searchTerm) || title.includes(searchTerm)) {
            section.classList.remove('hidden');
            hasVisibleSections = true;
            highlightSearchTerms(section);
        } else {
            section.classList.add('hidden');
        }
    });

    updateNavigationForSearch(hasVisibleSections);
}

// Clear search
function clearSearch() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('hidden');
    });

    // Remove highlights
    removeHighlights();

    // Reset navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.parentElement.style.display = '';
    });
}

// Highlight search terms
function highlightSearchTerms(section) {
    if (!searchTerm) return;

    // Remove existing highlights first
    removeHighlights();

    // Create a tree walker to find all text nodes (except in code blocks)
    const walker = document.createTreeWalker(
        section,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                const parent = node.parentElement;
                if (parent && (parent.tagName === 'CODE' || parent.tagName === 'PRE')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
        if (regex.test(text)) {
            const highlightedHTML = text.replace(regex, '<span class="highlight-search">$1</span>');
            const span = document.createElement('span');
            span.innerHTML = highlightedHTML;
            textNode.parentNode.replaceChild(span, textNode);
        }
    });
}

// Escape regex special characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Remove highlights
function removeHighlights() {
    document.querySelectorAll('.highlight-search').forEach(highlight => {
        const parent = highlight.parentNode;
        const textNode = document.createTextNode(highlight.textContent);
        parent.replaceChild(textNode, highlight);
        parent.normalize();
    });
}

// Update navigation for search
function updateNavigationForSearch(hasVisibleSections) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hasVisibleSections) {
        navLinks.forEach(link => {
            link.parentElement.style.display = 'none';
        });
    } else {
        navLinks.forEach(link => {
            const sectionId = link.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section && !section.classList.contains('hidden')) {
                link.parentElement.style.display = '';
            } else {
                link.parentElement.style.display = 'none';
            }
        });
    }
}

// Update search clear button
function updateSearchClearButton() {
    if (!elements.searchClear) return;
    
    if (elements.searchInput && elements.searchInput.value) {
        elements.searchClear.classList.add('visible');
    } else {
        elements.searchClear.classList.remove('visible');
    }
}

// Handle scroll events
function handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // Back to top button
    if (elements.backToTop) {
        if (scrollTop > 300) {
            elements.backToTop.classList.add('visible');
        } else {
            elements.backToTop.classList.remove('visible');
        }
    }

    // Update active nav item based on scroll position
    if (!searchTerm) {
        updateActiveNavOnScroll();
    }
}

// Setup scroll spy
function setupScrollSpy() {
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !searchTerm) {
                const sectionId = entry.target.id;
                updateActiveNavItem(sectionId);
            }
        });
    }, observerOptions);

    // Observe all sections once they're loaded
    setTimeout(() => {
        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });
    }, 500);
}

// Update active nav on scroll (fallback method)
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.content-section');
    const scrollTop = window.pageYOffset + 100;

    let activeSection = null;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            activeSection = section.id;
        }
    });
    
    if (activeSection) {
        updateActiveNavItem(activeSection);
    }
}

// Initialize syntax highlighting
function initializeSyntaxHighlighting() {
    if (typeof hljs !== 'undefined') {
        hljs.configure({
            languages: ['sql']
        });
        
        // Highlight all code blocks with a delay to ensure they're rendered
        setTimeout(() => {
            document.querySelectorAll('pre code').forEach(block => {
                if (!block.classList.contains('hljs')) {
                    hljs.highlightElement(block);
                }
            });
        }, 100);
    }
}