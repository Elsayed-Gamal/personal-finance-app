SELECT sum(amount) AS total_income FROM transactions
WHERE amount > 0; 

SELECT sum(amount) AS total_expenses FROM transactions
WHERE amount < 0;