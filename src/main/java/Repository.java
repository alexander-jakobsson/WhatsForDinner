import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class Repository {
    @Autowired
    private DataSource dataSource;
}
