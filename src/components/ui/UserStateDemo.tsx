import { Button } from '../Button';
import { useUser } from '../../hooks/useUser';

export const UserStateDemo: React.FC = () => {
    const { user, createAccount, logout, login } = useUser();
    const currentUser = user.value;

    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {currentUser ? (
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                            {currentUser.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span className="text-gray-900 dark:text-gray-100">
                        Welcome, <strong>{currentUser.name}</strong>!
                    </span>
                </div>
            ) : (
                <span className="text-gray-600 dark:text-gray-400">
                    You are not logged in
                </span>
            )}

            <div className="flex space-x-2">
                {currentUser ? (
                    <Button
                        variant="outline"
                        size="sm"
                        label="Log out"
                        onClick={logout}
                    />
                ) : (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            label="Log in"
                            onClick={() => login('Jane Doe')}
                        />
                        <Button
                            variant="primary"
                            size="sm"
                            label="Sign up"
                            onClick={() => createAccount('John Smith')}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
