--SELECT USER FROM dual;
--GRANT CREATE TABLE TO pablor;
--GRANT UNLIMITED TABLESPACE TO pablor;

ALTER TABLE orden_compra ADD (
    Direccion_Envio VARCHAR2(255),
    Metodo_Pago VARCHAR2(50)
);