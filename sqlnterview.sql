-- write the table in sql 
WITH recursive cte as (
select 5 as n,1 as c,5 as e from dual
union all 
select n as v,c+1 , e+n from cte where c<10
)
select * from cte 

--------------------------------------------
