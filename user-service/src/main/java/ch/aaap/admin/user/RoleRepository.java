package ch.aaap.admin.user;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {

    List<Role> findAll();
}
