package com.plm.child;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

@Component
public class ChildDaoImpl implements ChildDao {

    static final String GET_CHILD_BY_ID_QUERY = "select * from child where id = ?";
    static final String CHILD_ID_COLUMN = "id";
    static final String CHILD_FIRST_NAME_COLUMN = "first_name";
    static final String CHILD_SURNAME_COLUMN = "surname";
    static final String CHILD_DATE_OF_BIRTH_COLUMN = "date_of_birth";

    private DBProperties dbProperties;

    @Autowired
    public ChildDaoImpl(DBProperties dbProperties)
    {
        this.dbProperties = dbProperties;
    }

    @Override
    public Child getChildById(int id) throws ResourceNotFoundException {

        try {
            registerDriverClass(dbProperties.getDriverClass());
        } catch (ClassNotFoundException cnfe) {
            cnfe.printStackTrace();
            throw new RuntimeException("Database driver cannot be registered!");
        }

        try (
                Connection dbConnection = createDBConnection(
                        dbProperties.getUrl(), dbProperties.getUsername(), dbProperties.getPassword());
                PreparedStatement getChildByIdStatement = dbConnection.prepareStatement(GET_CHILD_BY_ID_QUERY);
            )
        {
            getChildByIdStatement.setInt(1, id);

            ResultSet resultSet = getChildByIdStatement.executeQuery();

            if (resultSet.first()) {

                int childId = resultSet.getInt(CHILD_ID_COLUMN);
                String firstName = resultSet.getString(CHILD_FIRST_NAME_COLUMN);
                String surname = resultSet.getString(CHILD_SURNAME_COLUMN);
                Date dateOfBirth = new Date(resultSet.getDate(CHILD_DATE_OF_BIRTH_COLUMN).getTime());

                return new Child(childId, firstName, surname, dateOfBirth);

            } else {
                throw new ResourceNotFoundException("Child was not found!");
            }
        } catch (SQLException sqle) {

            sqle.printStackTrace();

            throw new RuntimeException("Database query failed!");
        }
    }

    void registerDriverClass(String dbDriverClass) throws ClassNotFoundException {
        Class.forName(dbDriverClass);
    }

    Connection createDBConnection(String dbUrl, String dbUsername, String dbPassword) throws SQLException {
        return DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
    }
}
