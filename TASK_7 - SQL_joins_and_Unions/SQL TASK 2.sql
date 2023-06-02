select * from Employee
select * from Orders
select * from OrderDetails
select * from Products
select * from Suppliers
select * from Shippers

--1.	Get the firstname and lastname of the employees who placed orders between 15th August,1996
--		and 15th August,1997

Select distinct Employee.EmployeeID, Employee.FirstName,Employee.LastName
from Employee inner join Orders on Employee.EmployeeID=Orders.EmployeeID
where OrderDate between '1996-08-15' and '1997-08-15';						--9

--2. 	Get the distinct EmployeeIDs who placed orders before 16th October,1996

select distinct EmployeeID
from Orders as o 
where o.OrderDate < '1996-10-16';

--3.	How many products were ordered in total by all employees between  13th of January,1997 and 
--		16th of April,1997.

select count(distinct ProductID)
from Orders as o inner join OrderDetails as od on o.OrderID = od.OrderID
where OrderDate between '1997-01-13' and '1997-04-16'; --69

--4.	What is the total quantity of products for which Anne Dodsworth placed orders between  
--		13th of January,1997 and 16th of April,1997.

select sum( Quantity)
from Orders as o inner join OrderDetails as od on o.OrderID = od.OrderID
where (OrderDate between '1997-01-13' and '1997-04-16') and (EmployeeID = 
( select EmployeeID from Employee where FirstName='Anne' and LastName='Dodsworth')) --189

--5.	How many orders have been placed in total by Robert King

select count( distinct o.OrderID)
from Orders as o inner join OrderDetails as od on o.OrderID = od.OrderID
where EmployeeID = ( select EmployeeID from Employee where FirstName='Robert' and LastName='King')--72

--6.   How many products have been ordered by Robert King between 15th August,1996 and 15th August,1997
select count( distinct ProductID)
from Orders as o inner join OrderDetails as od on o.OrderID = od.OrderID
where (OrderDate between '1996-08-15' and '1997-08-15') and (EmployeeID = 
( select EmployeeID from Employee where FirstName='Robert' and LastName='King'))--51

--7.	I want to make a phone call to the employees to wish them on the occasion of Christmas who
--		placed orders between  13th of January,1997 and 16th of April,1997. 
--		I want the EmployeeID, Employee Full Name, HomePhone Number.

select distinct e.EmployeeID, FirstName + ' '+ Lastname as Names, HomePhone
from (Orders as o inner join OrderDetails as od on o.OrderID = od.OrderID) inner join 
Employee as e on e.EmployeeID= o.EmployeeID
where OrderDate between '1997-01-14' and '1997-04-15'  --9

--8.	Which product received the most orders. Get the product's ID and Name and number of 
--		orders it received.


select top(1) OrderDetails.ProductID,Products.ProductName,count(*) as Number_of_orders
from OrderDetails inner join Products on OrderDetails.ProductID= Products.ProductID
group by OrderDetails.ProductID, Products.ProductName
order by count(*) desc    --59

--9.	Which are the least shipped products. List only  the top 5 from your list.
select top(5) od.ProductID, count( o.ShippedDate)
from Orders as o inner join OrderDetails as od on o.OrderID= od.OrderID
group by od.ProductID
order by count(o.ShippedDate) ---9,15,48,37,66

--10.	What is the total price that is to be paid by Laura Callahan for the order  
--		placed on 13th of January,1997

select (Quantity*UnitPrice)*( 1- Discount) as  Total_price
from (Orders as o inner join OrderDetails as od on o.OrderID= od.OrderID) inner join 
Employee as e on o.EmployeeID= e.EmployeeID
where OrderDate = '1997-01-13' and FirstName='Laura' and  LastName='Callahan' ---334.8

--11.	How many number of unique employees placed orders for Gorgonzola Telino or 
--		Gnocchi di nonna Alice or Raclette Courdavault or Camembert Pierrot in the month January,1997

select count(distinct EmployeeID)
from (Orders as o inner join OrderDetails as od on o.OrderID= od.OrderID) inner join 
Products as p on od.ProductID= p.ProductID
where ProductName IN ('Gorgonzola Telino','Gnocchi di nonna Alice', 'Raclette Courdavault', 
'Camembert Pierrot') and OrderDate between'1997-01-01' and '1997-01-31' ---9

--12.	What is the full name of the employees who ordered Tofu between 13th of January,1997 and  
--	30th of January,1997

select FirstName + ' '+ LastName as FullName
from (Orders as o inner join OrderDetails as od on o.OrderID= od.OrderID) inner join Products as p 
on od.ProductID= p.ProductID inner join Employee on Employee.EmployeeID= o.EmployeeID
where ProductName='Tofu' and OrderDate between '1997-01-13' and '1997-01-30' -- Laura , Margaret

--13.	What is the age of the employees in days, months and years who placed orders during the month of August. Get employeeID and full name as well
 
 select e.EmployeeID, FirstName+' '+LastName as FullName, DATEDIFF(year,e.BirthDate, GETDATE()) as 
 age_in_years, DATEDIFF(month,e.BirthDate, GETDATE()) as age_in_months,
 DATEDIFF(day,e.BirthDate, GETDATE()) as age_in_days
 from Employee as e inner join Orders as o on e.EmployeeID=o.EmployeeID
 where month(OrderDate)='08' --58

 --14.	Get all the shipper's name and the number of orders they shipped

 select s.CompanyName,count(distinct OrderID)
 from Orders as o inner join Shippers as s on o.ShipperID=s.ShipperID
 where ShippedDate is not null
 group by s.CompanyName--255,249,326

 --15.	Get the all shipper's name and the number of products they shipped.

 select count(distinct ProductID)
 from (Orders as o inner join OrderDetails as od on o.OrderID=od.OrderID) inner join 
 Shippers as s on s.ShipperID=o.ShipperID
 group by s.ShipperID --77,77,77

 --16.	Which shipper has bagged most orders. Get the shipper's id, name and the number of orders.
 select top(1) s.ShipperID,s.CompanyName,count(distinct OrderID) as number_of_orders
 from Orders as o inner join Shippers as s on o.ShipperID=s.ShipperID
 group by s.ShipperID,s.CompanyName
 order  by count(distinct OrderID) desc  ---United Package 

 --17.	Which shipper supplied the most number of products between 10th August,1996 and 
 --		20th September,1998. Get the shipper's name and the number of products.
 
 select s.ShipperID,count(distinct ProductID)
 from (orders as o inner join OrderDetails as od on o.OrderID=OD.OrderID) INNER JOIN 
 Shippers as s on s.ShipperID=o.ShipperID
where OrderDate between '1996-08-10' and '1998-09-20'
 group by s.ShipperID
 order by count(distinct ProductID) DESC

 --18.	Which employee didn't order any product 4th of April 1997

 select EmployeeID FROM Employee where EmployeeID not in (select e.EmployeeID
 from (Employee as e left join Orders as o on e.EmployeeID=o.EmployeeID) inner join 
 OrderDetails as od on od.OrderID=o.OrderID
 where o.OrderDate='1997-04-04'
 group by e.EmployeeID)   ---except 7

 --19.	How many products where shipped to Steven Buchanan

 select count(distinct ProductID)
 from (Employee as e inner join Orders as o on e.EmployeeID=o.EmployeeID ) inner join 
 OrderDetails as od on od.OrderID= o.OrderID
 where e.FirstName='Steven' and e.LastName='Buchanan' and ShippedDate is not NULL
 group by e.EmployeeID --52

 --20.	How many orders where shipped to Michael Suyama by Federal Shipping
  select count(distinct o.OrderID)
 from (Employee as e inner join Orders as o on e.EmployeeID=o.EmployeeID ) inner join 
 OrderDetails as od on od.OrderID= o.OrderID inner join Shippers as s on s.ShipperID=o.ShipperID
 where e.FirstName='Michael' and e.LastName='Suyama' and s.CompanyName='Federal Shipping' 
 and o.ShippedDate is not null
 group by e.EmployeeID --18

 --21.	How many orders are placed for the products supplied from UK and Germany
 select count(distinct OrderID)
 from OrderDetails as od inner join Products as p on od.ProductID=p.ProductID inner join 
 Suppliers as su on su.SupplierID=p.SupplierID
 where su.Country IN ('UK','Germany')   --385

 --22.	How much amount Exotic Liquids received due to the order placed for its products in 
 --		the month of January,1997
 select sum(od.Quantity*od.UnitPrice)
 from Suppliers as su inner join Products as p on su.SupplierID=p.SupplierID inner join 
 OrderDetails as od on od.ProductID=p.ProductID inner join Orders as o on o.OrderID=od.OrderID
 where o.OrderDate between '1997-01-01' and '1997-01-31' and su.CompanyName='Exotic Liquids'
 --1800

 --23.	In which days of January, 1997, the supplier Tokyo Traders haven't received any orders.
select distinct OrderDate from Orders where OrderDate not in(
 select o.OrderDate
 from suppliers as su inner join products as p on p.SupplierID=su.SupplierID inner join 
 OrderDetails as od on od.ProductID=p.ProductID inner join orders as o on o.OrderID= od.OrderID
 where su.CompanyName='Tokyo Traders' and o.OrderDate between '1997-01-01' and '1997-01-31') and 
 month(OrderDate)='01' and year(OrderDate)='1997' --21 rows

 --24.	Which of the employees did not place any order for the products supplied by Ma Maison 
 --		in the month of May
 select EmployeeID from Employee where EmployeeID not in (
 select distinct e.EmployeeID
 from suppliers as su inner join products as p on p.SupplierID=su.SupplierID
 inner join OrderDetails as od on od.ProductID=p.ProductID 
 inner join orders as o on o.OrderID= od.OrderID inner join Employee as e on e.EmployeeID=o.EmployeeID
 where su.CompanyName='Ma Maison' and month(o.OrderDate)='05') --except 1,5

 --25.	Which shipper shipped the least number of products for the month of September and October,
 --		1997 combined.
 
 select top(1) sh.ShipperID,sh.CompanyName, count( distinct p.ProductID) as products_shipped
 from suppliers as su inner join products as p on p.SupplierID=su.SupplierID inner join 
 OrderDetails as od on od.ProductID=p.ProductID 
 inner join orders as o on o.OrderID= od.OrderID inner join 
 Employee as e on e.EmployeeID=o.EmployeeID inner join Shippers as sh on sh.ShipperID=o.ShipperID
where ((month(o.OrderDate) in ('09','10')) and (year(o.OrderDate) ='1997')) and 
o.ShippedDate is not null
group by sh.ShipperID, sh.CompanyName
order by count(distinct p.ProductID) --Federal Shipping

--26.	What are the products that weren't shipped at all in the month of August, 1997
select ProductName from Products where ProductID not in (
select  distinct od.ProductID
from orders as o inner join OrderDetails as od on od.OrderID=o.OrderID 
where o.OrderDate between '1997-08-01' and '1997-08-31' and o.ShippedDate is not null
) --24

--27.	What are the products that weren't ordered by each of the employees. List each employee and 
--		the products that he didn't order.

create view AllProducts as
select E.EmployeeID, P.ProductID from Employee E
right join Products P on 1=1
group by E.EmployeeID, P.ProductID;

create view Ordered as
select E.EmployeeID, OD.ProductID from Employee E
inner join Orders O on O.EmployeeID = E.EmployeeID
inner join OrderDetails OD on OD.OrderID = O.OrderID
group by E.EmployeeID, OD.ProductID



select * from AllProducts as al
where al.ProductID not in (select EP.ProductID from Ordered EP 
	where EP.EmployeeID = al.EmployeeID
	and EP.ProductID = al.ProductID)
order by EmployeeID			--105 rows




--28.	Who is busiest shipper in the months of April, May and June during the year 1996 and 1997

select top(1) o.ShipperID,sh.CompanyName, count(distinct o.OrderID) as order_count
from Shippers as sh inner join Orders as o on o.ShipperID=sh.ShipperID
where month(o.ShippedDate) in ('04','05','06') and year (o.OrderDate) in ('1996','1997') and
ShippedDate is not null
group by o.ShipperID, sh.CompanyName
order by order_count desc  --UNITED PACKAGE

--29.	Which country supplied the maximum products for all the employees in the year 1997

select top(1) s.Country, count( distinct p.ProductID) as products_supplied
from orders as o inner join OrderDetails as od on od.OrderID= o.OrderID inner join
Products as p on p.ProductID=od.ProductID inner join Suppliers as s on s.SupplierID=p.SupplierID
where year(o.OrderDate)='1997'
group  by s.Country
order by count( distinct p.productID) desc ---USA 12

--30.	What is the average number of days taken by all shippers to ship the 
--		product after the order has been placed by the employees

select sh.CompanyName,avg( Datediff(day,o.OrderDate,o.ShippedDate))
from orders as o inner join Shippers as sh on sh.ShipperID=o.ShipperID
group by sh.CompanyName

--31.	Who is the quickest shipper of all.
select top(1)  shippers.ShipperID,shippers.CompanyName,avg(datediff( day, OrderDate, ShippedDate)) 
as diff
from orders inner join Shippers on Orders.ShipperID=Shippers.ShipperID
where ShippedDate is not null
group by Shippers.ShipperID, Shippers.CompanyName
order by diff --Federal Shipping

--32.	Which order took the least number of shipping days. Get the orderid,
--		employees full name, number of products, number of days  took to ship and shipper company name.

select o.OrderID,e.FirstName + ' '+e.LastName as FUllname,count(distinct od.ProductID) as 
number_of_products,avg(datediff(day,o.OrderDate,o.ShippedDate)) as diff
from orders as o inner join Employee as e on o.EmployeeID=e.EmployeeID inner join OrderDetails as
od on od.OrderID=o.OrderID
where ShippedDate is not null
group by o.OrderID,e.FirstName,e.Lastname
having avg(datediff(day,o.OrderDate,o.ShippedDate))= ( select min(datediff(day,OrderDate,ShippedDate))
from Orders)
order by diff   --18 rows

--'Unions'
--1.	Which orders took the least number and maximum number of shipping days. Get the orderid, 
--		employees full name, number of products, number of days  taken to ship the product and 
--		shipper company name. Use 1 and 2 in the final result set to distinguish the 2 orders.

 select o.OrderID,e.FirstName + ' '+e.LastName as FUllname,count(distinct od.ProductID) as 
 number_of_products, avg(datediff(day,o.OrderDate,o.ShippedDate)) as diff
from orders as o inner join Employee as e on o.EmployeeID=e.EmployeeID inner join 
OrderDetails as od on od.OrderID=o.OrderID
where ShippedDate is not null
group by o.OrderID,e.FirstName,e.Lastname
having avg(datediff(day,o.OrderDate,o.ShippedDate))= ( select min(datediff(day,OrderDate,ShippedDate))
from Orders)

UNION
select o.OrderID,e.FirstName + ' '+e.LastName as FUllname,count(distinct od.ProductID) as 
number_of_products, avg(datediff(day,o.OrderDate,o.ShippedDate)) as diff
from orders as o inner join Employee as e on o.EmployeeID=e.EmployeeID inner join 
OrderDetails as od on od.OrderID=o.OrderID
where ShippedDate is not null
group by o.OrderID,e.FirstName,e.Lastname
having avg(datediff(day,o.OrderDate,o.ShippedDate))= ( select max(datediff(day,OrderDate,ShippedDate))
from Orders)
order by diff;

--2.	Which is cheapest and the costliest of products purchased in the second week of October,1997. 
--		Get the product ID, product Name and unit price. Use 1 and 2 in the final result set to 
--		distinguish the 2 products.

select distinct p.ProductID, p.ProductName, p.UnitPrice
from orders as o inner join OrderDetails as od on o.OrderID=od.OrderID 
inner join products as p on p.ProductID=od.ProductID
where o.OrderDate between '1997-10-05' and '1997-10-11' and p.UnitPrice = 
(select min(p.UnitPrice) from orders as o inner join OrderDetails as od on o.OrderID=od.OrderID 
inner join products as p on p.ProductID=od.ProductID where o.OrderDate between '1997-10-05' and 
'1997-10-11')
group by p.ProductID,p.ProductName,p.UnitPrice
union 
select distinct p.ProductID, p.ProductName, p.UnitPrice
from orders as o inner join OrderDetails as od on o.OrderID=od.OrderID 
inner join products as p on p.ProductID=od.ProductID
where o.OrderDate between '1997-10-05' and '1997-10-11' and p.UnitPrice = 
(select max(p.UnitPrice) from orders as o inner join OrderDetails as od on o.OrderID=od.OrderID 
inner join products as p on p.ProductID=od.ProductID where o.OrderDate between '1997-10-05' and
'1997-10-11')
group by p.ProductID,p.ProductName,p.UnitPrice
order by p.UnitPrice;






--'Case'
--1.	Find the distinct shippers who are to ship the orders placed by employees with IDs 1, 3, 5, 7
--		Show the shipper's name as "Express Speedy" if the shipper's ID is 2 and "United Package" 
--		if the shipper's ID is 3 and " Shipping Federal" if the shipper's ID is 1.

select distinct o.ShipperID,
case 
	WHEN o.shipperID='1' THEN 'Shipping Federal'
	WHEN o.shipperID='2' THEN 'United Package'
	WHEN o.shipperID='3' THEN 'Express Speedy'
	else 'Shipper name'
end as Shipper_Name
from Orders as o
where o.EmployeeID in ('1','2','3','5','7')

